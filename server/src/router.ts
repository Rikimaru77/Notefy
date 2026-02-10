import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define note-related routes
import noteActions from "./modules/note/noteActions";

router.get("/api/notes", noteActions.browse);
router.get("/api/notes/:id(\\d+)", noteActions.read);
router.get("/api/notes/:slug", noteActions.readBySlug);
router.post("/api/notes", noteActions.add);
router.put("/api/notes/:id", noteActions.edit);

/* ************************************************************************* */

export default router;
