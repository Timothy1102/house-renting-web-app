const houseOwnerRoute = require('express').Router();
const UserController = require('../controllers/user.controller');
const verifyJwtToken = require('../middleware/authorization');

const basePath = '/api/v1/house-owner';
const userController = new UserController();

houseOwnerRoute.get(`${basePath}/`, verifyJwtToken, userController.houseOwnerAuthorized);

module.exports = houseOwnerRoute;
