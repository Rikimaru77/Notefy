import crypto from "node:crypto";
import type { RequestHandler } from "express";

import noteRepository from "./noteRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const notes = await noteRepository.readAll();

    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const noteId = Number(req.params.id);
    const note = await noteRepository.read(noteId);

    if (note == null) {
      res.sendStatus(404);
    } else {
      res.json(note);
    }
  } catch (err) {
    next(err);
  }
};

const readBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const note = await noteRepository.readBySlug(slug);

    if (note == null) {
      res.sendStatus(404);
    } else {
      res.json(note);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, content, is_private, linkshare, password } = req.body;

    const slug = crypto.randomBytes(5).toString("hex");

    const newNote = {
      name: name || "Untitled Note",
      slug: slug,
      is_private: is_private ?? false,
      linkshare: linkshare ?? false,
      password: password || null,
    };

    const insertId = await noteRepository.create(newNote, content || "");
    // console.log(newNote);
    res.status(201).json({ insertId, slug });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const noteId = Number(req.params.id);
    const updatedNote = {
      name: req.body.name,
      content: req.body.content,
      is_private: req.body.is_private,
      linkshare: req.body.linkshare,
      password: req.body.password,
    };

    const affectedRows = await noteRepository.update(noteId, updatedNote);

    if (affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readBySlug, add, edit };
