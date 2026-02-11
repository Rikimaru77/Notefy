# Notefy API Documentation
By Gemini for MrX

This API allows you to manage notes and user accounts. It follows REST principles and uses JWT for authentication.

## base URL
`http://localhost:3310/api`

## Authentication

### Login
`POST /login`
- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: `200 OK` with `{ "token": "...", "user": { ... } }` or `422 Unprocessable Entity`

### Register
`POST /users`
- **Body**: `{ "email": "...", "password": "...", "firstname": "...", "lastname": "..." }`
- **Response**: `201 Created` with `{ "insertId": ... }`

---

## Notes

### List All Public Notes
`GET /notes`
- **Response**: `200 OK` with an array of notes.

### Get Note by ID
`GET /notes/:id`
- **Response**: `200 OK` with note details or `404 Not Found`.

### Get Note by Slug
`GET /notes/:slug`
- **Response**: `200 OK` with note details or `404 Not Found`.

### Create a Note (Protected)
`POST /notes`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "...", "content": "...", "is_private": ..., "linkshare": ... }`
- **Response**: `201 Created` with `{ "insertId": ..., "slug": "..." }`

### Update a Note (Protected)
`PUT /notes/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Same as Create (all fields optional)
- **Response**: `204 No Content` or `404 Not Found`

---

## Favorites (Protected)

### List All My Favorites
`GET /favorites`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with an array of favorited notes.

### Add a Note to Favorites
`POST /favorites`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "noteId": ... }`
- **Response**: `201 Created`

### Remove a Note from Favorites
`DELETE /favorites/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `204 No Content`

---

## Users (Protected)

### List All Users
`GET /users`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with an array of users.

### Get User by ID
`GET /users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with user details.
