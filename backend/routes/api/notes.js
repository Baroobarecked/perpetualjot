const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize');

const router = express.Router();

const validateAddInput = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a title'),
    handleValidationErrors
]

const validateUserUpdateInput = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a title')
      .custom((title, { req }) => {
          return Note.findOne({ where: { 
                    title : {
                        [Sequelize.Op.iLike]: title
                    },
                    notebookId: req.body.notebookId,
                }
          })
            .then((res) => {
                if(res !== null && (req.body.noteId !== res.id && req.body.title !== 'Untitled')) {
                    return Promise.reject('Title must be unique inside current notebook or left as Untitled')
                }
            })
      }),
    check('content')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a note'),
    handleValidationErrors
]

router.post('/', requireAuth, validateAddInput, asyncHandler(async (req, res) => {

    const { title, userId, notebookId, content } = req.body;

    const newNote = await Note.create({
        title,
        userId,
        notebookId,
        content,
    });

    return res.json(newNote);
}));

router.put('/', requireAuth, validateUserUpdateInput, asyncHandler(async (req, res) => {

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