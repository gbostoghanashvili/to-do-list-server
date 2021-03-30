const express = require('express')
const router = express.Router()
const authHandler = require('../controller/auth');
const authMiddleware = require('../middleware/authmiddleware');


router.post('/signup', (req, res, next) => authHandler.signUp(req, res,next));
router.post('/', (req, res, next) => authHandler.logUserIn(req, res, next));
router.post('/check', authMiddleware, (req, res, next) => authHandler.check(req, res, next))


module.exports = router;
