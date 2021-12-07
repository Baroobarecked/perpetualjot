const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(async (req, res) => {

    const { title, userId, notebookId, content } = req.body;

    const newNote = await Note.create({
        title,
        userId,
        notebookId,
        content,
    });

    return res.json(newNote);
}));

router.put('/', requireAuth, asyncHandler(async (req, res) => {

    const { title, content, notebookId, noteId } = req.body;

    const note = await Note.findByPk(noteId);

    const updated = await note.update({
        title,
        content,
        notebookId,
    })

    return res.json(updated);

}));

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { noteId } = req.body;

    const note = await Note.findByPk(noteId);

    note.destroy();

    return res.json({});
}))

module.exports = router;