const router = require('express').Router();
const sessionRouter = require('./session');
const userRouter = require('./users');

router.use('/session', sessionRouter);

router.use('/users', userRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});


  
module.exports = router;