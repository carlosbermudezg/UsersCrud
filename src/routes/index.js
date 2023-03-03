const usersRouter = require('./users.router')
const express = require('express');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', usersRouter)

module.exports = router;