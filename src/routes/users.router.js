const { getAll, create, getOne, remove, update, login, logedUser } = require('../controllers/users.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const usersRouter = express.Router();

usersRouter.route("/")
		.get(verifyJWT, getAll)
		.post(create)
usersRouter.route("/login")
		.get(login)
usersRouter.route("/me")
		.get(verifyJWT, logedUser)
usersRouter.route("/:id")
		.get(verifyJWT, getOne)
		.delete(remove)
		.put(update)

module.exports = usersRouter;