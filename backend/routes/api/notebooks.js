const express = require('express');
const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { Notebook, Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateUserInput = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a title')
      .custom((title, { req }) => {
        //   console.log(req)
          return Notebook.findOne({ where: { title : {
                    [Sequelize.Op.iLike]: title
                }
            }})
            .then((res) => {
                console.log(res, req.body)
                if(res !== null && req.body.notebookId !== res.id) {
                    return Promise.reject('Title must be unique')
                }
            })
      }),
    handleValidationErrors
]

router.post('/', requireAuth, validateUserInput, asyncHandler(async (req, res) => {

    const { title, userId } = req.body;

    const newNotebook = await Notebook.create({
        title,
        userId
    });

    return res.json(newNotebook);
}));

router.put('/', requireAuth, validateUserInput, asyncHandler(async (req, res) => {

    const { title, notebookId } = req.body;
    console.log(req.body)

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

router.get('/:notebookId/removenotes/', requireAuth, asyncHandler(async (req, res) => {
    const {notebookId} = req.params
  
    const note = await Note.findAll({
        where: {
            [Sequelize.Op.not]: {notebookId}
        }
    });
  
    return res.json(note);
}));


module.exports = router;