const testRouter = require('express').Router();
const UserController = require('../controllers/user.controller');

const userController = new UserController();

testRouter.get('/api/v1/users', userController.getUsers);

module.exports = testRouter;
