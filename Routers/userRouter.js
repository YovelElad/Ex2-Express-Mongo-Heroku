const { Router } = require('express');
const { usersController } = require("../Controllers//userController");
const usersRouter = new Router();

usersRouter.post('/',usersController.searchUser);

module.exports = {usersRouter};