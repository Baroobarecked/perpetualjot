const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Notebook, Note } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(async (req, res) => {

    const { title, userId } = req.body;

    const newNotebook = await Notebook.create({
        title,
        userId
    });

    return res.json(newNotebook);
}));

router.put('/', requireAuth, asyncHandler(async (req, res) => {

    const { title, notebookId } = req.body;

    const notebook = await Notebook.findByPk(notebookId);

    const updated = await notebook.update({
        title,
    })

    return res.json(updated);

}));

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { notebookId } = req.body;

    const notebook = await Notebook.findByPk(notebookId);

    notebook.destroy();

    return res.json({});
}));

router.get('/:notebookId/notes/', requireAuth, asyncHandler(async (req, res) => {
    const {notebookId} = req.params
  
    const note = await Note.findAll({
        where: {
            notebookId
        }
    });
  
    return res.json(note);
}));


module.exports = router;