const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Notebook } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(async (req, res) => {

    const { title, userId } = req.body;
    console.log(userId)

    console.log(title, userId);
    const newNotebook = await Notebook.create({
        title,
        userId
    });

    return res.json(newNotebook);
}));

router.put('/', requireAuth, asyncHandler(async (req, res) => {

    const { title, notebookId } = req.body;
    // console.log(userId)

    // console.log(title, userId);
    const notebook = await Notebook.findByPk(notebookId);

    const updated = await notebook.update({
        title,
    })

    return res.json(updated);

}));


module.exports = router;