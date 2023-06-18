const houseRouter = require('express').Router();
const HouseController = require('../controllers/house.controller');
const verifyJwtToken = require('../middleware/authorization');

const houseController = new HouseController();

houseRouter.get('/api/v1/house', verifyJwtToken, houseController.getHouses); //get houses belong to a user
houseRouter.post('/api/v1/house', verifyJwtToken, houseController.createHouse); //create a new house

module.exports = houseRouter;
