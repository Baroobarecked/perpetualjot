const router = require('express').Router();
const sessionRouter = require('./session');
const userRouter = require('./users');
const notebooksRouter = require('./notebooks')
const notesRouter = require('./notes');

router.use('/session', sessionRouter);

router.use('/users', userRouter);

router.use('/notebooks', notebooksRouter);

router.use('/notes', notesRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});


  
module.exports = router;