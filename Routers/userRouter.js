
const { Router } = require('express');
const { usersController } = require("../Controllers//userController");
const usersRouter = new Router();

console.log('userRouter file');
usersRouter.post('/',usersController.searchUser);


module.exports = {usersRouter};