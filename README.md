Bienvenue dans la documentation de l'API Notefy. Cette application permet de gérer des notes personnelles, de les protéger par mot de passe, de les rendre privées ou publiques, et de gérer des favoris.

##  Modélisation de la Base de Données

Les diagrammes de conception sont disponibles dans le dossier `docs/` :
- [**Diagramme Global** (Conception complète)](docs/database_design.drawio) : Vue d'ensemble de la base de données.
- [**MCD** (Modèle Conceptuel de Données)](docs/mcd.drawio) : Représentation des entités et relations.
- [**MLD** (Modèle Logique de Données)](docs/mld.drawio) : Détail des tables, colonnes et clés étrangères.

---
## 🛠️ Installation et Configuration Locale

Pour tester l'application en local, suivez ces étapes :

### 1. Prérequis
- **Node.js** (dernière version LTS recommandée)
- **MySQL** installé et en cours d'exécution

### 2. Création de la Base de Données
Ouvrez votre terminal MySQL (ou un outil comme MySQL Workbench) et exécutez les commandes suivantes :

```sql
-- Connexion à MySQL
mysql -u root -p

-- Création de la base de données
CREATE DATABASE notefy_db;

-- (Optionnel) Création d'un utilisateur dédié
CREATE USER 'notefy_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON notefy_db.* TO 'notefy_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configuration des variables d'environnement
Le projet utilise des fichiers `.env` pour stocker les informations sensibles.

1.  Allez dans le dossier `server/`.
2.  Copiez le fichier `.env.sample` et renommez-le en `.env`.
3.  Modifiez les valeurs pour correspondre à votre configuration locale :

```bash
# server/.env
APP_PORT=3310
APP_SECRET=votre_cle_secrete_jwt
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=notefy_db
CLIENT_URL=http://localhost:3000
```

### 4. Exemple de configuration en Production
Pour un déploiement (ex: Alwaysdata), votre fichier `.env` ressemblera à ceci :

```bash
# server/.env (Production)
APP_PORT=3310
APP_SECRET=mZTUjliavcgSjw9Iv1euKnHJqrP7IudK
DB_HOST=mysql-julesbdev.alwaysdata.net
DB_PORT=3306
DB_USER=julesbdev
DB_PASSWORD=Julesbdev2026!
DB_NAME=julesbdev_notefy
CLIENT_URL=http://localhost:3000
PROJECT_NAME_SPECIFIC_NAME=Notefy
```

### 5. Lancement du projet
Retournez à la racine du projet et exécutez :

```bash
npm install        # Installer les dépendances
npm run db:migrate # Lancer les migrations (si applicable)
npm run db:seed    # Remplir la base avec des données de test
npm run dev        # Lancer le client et le serveur en même temps
```

---

## 🚀 Serveur (API REST)

L'API est construite avec **Node.js** et **Express**. Elle utilise des Jetons Web JSON (JWT) pour l'authentification et **Argon2** pour le hachage des mots de passe.

**URL de base :** `http://localhost:3310` (toutes les routes commencent par `/api`)

### 🔐 Authentification

#### 1. Connexion
*   **Route :** `POST /api/login`
*   **Description :** Authentifie un utilisateur et retourne un jeton JWT.
*   **Corps (JSON) :**
    ```json
    {
      "email": "user@example.com",
      "password": "votre_mot_de_passe"
    }
    ```
*   **Réponse (200 OK) :**
    ```json
    {
      "token": "eyJhbG...",
      "user": { "id": 1, "email": "...", "role": "user" }
    }
    ```

#### 2. Inscription
*   **Route :** `POST /api/users`
*   **Description :** Crée un nouveau compte utilisateur.
*   **Corps (JSON) :** `email`, `password`, `firstname` (optionnel), `lastname` (optionnel).
*   **Réponse :** `201 Created` ou `409 Conflict` (si l'email existe déjà).

---

### 📝 Gestion des Notes

#### 1. Lister les notes
*   **Route :** `GET /api/notes`
*   **Authentification :** Optionnelle (Bearer Token).
*   **Description :** Retourne les notes publiques. Si authentifié, retourne également les notes privées de l'utilisateur.

#### 2. Voir une note par Slug
*   **Route :** `GET /api/notes/:slug`
*   **Description :** Récupère le contenu d'une note. Si elle est protégée par mot de passe, le contenu sera masqué jusqu'à vérification.

#### 3. Vérifier le mot de passe d'une note
*   **Route :** `POST /api/notes/:slug/verify-password`
*   **Corps :** `{ "password": "..." }`
*   **Description :** Débloque le contenu d'une note protégée.

#### 4. Créer / Modifier / Supprimer (Protégé)
*   **Routes :** `POST /api/notes`, `PUT /api/notes/:id`, `DELETE /api/notes/:id`
*   **Authentification :** Requise (Bearer Token).
*   **Champs :** `name`, `content`, `is_private` (booléen), `password` (optionnel).

---

### ⭐ Favoris (Protégé)

*   `GET /api/favorites` : Liste toutes les notes mises en favoris par l'utilisateur.
*   `POST /api/favorites` : Ajoute une note aux favoris (`{ "noteId": id }`).
*   `DELETE /api/favorites/:id` : Retire une note des favoris.

---

## 💻 Fonctionnement du Client (Frontend)

Le frontend est développé avec **React**, **Vite** et **Tailwind CSS**.

### 🔑 Gestion des Sessions et Cookies
Le client a migré de `localStorage` vers les **Cookies** pour une meilleure gestion de la sécurité et de la persistance.
- **Stockage :** Le jeton `token` est stocké dans un cookie avec une durée de vie de 7 jours.
- **Utilitaires (`client/src/utils/auth.ts`) :**
    - `islogin(require)` : Vérifie la présence et la validité (expiration) du JWT en décodant la charge utile (payload). Si `require` est vrai et que l'utilisateur n'est pas connecté, il est redirigé vers `/login`.
    - `logout()` : Supprime le cookie et redirige vers la page de connexion.

### ⚡ Performance et Optimisation
- **Lazy Loading :** Les composants lourds comme `NoteView` et `NoteEdit` sont chargés de manière asynchrone via `React.lazy`.
- **Suspense :** Un composant `Loading` est affiché pendant le chargement des pages ou des composants asynchrones.
- **Gestion des erreurs JWT :** Le client intercepte les erreurs `401 Unauthorized` pour déconnecter automatiquement l'utilisateur si son jeton a expiré.

### 🎨 Interface et Composants
- **Mode Sombre :** Support natif du mode sombre/clair via un `ThemeProvider`.
- **Composants Partagés :** `Footer` (présent sur toutes les pages) et `Loading`.
- **Navigation :** Utilisations de `react-router` pour une navigation fluide sans rechargement de page.

---

*Document mis à jour le 18 Février 2026 par Jules a l'aide de l'IA.*
