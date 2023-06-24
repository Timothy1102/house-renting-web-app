const houseRouter = require('express').Router();
const HouseController = require('../controllers/house.controller');
const verifyJwtToken = require('../middleware/authorization');

const houseController = new HouseController();

houseRouter.get('/api/v1/house', verifyJwtToken, houseController.getHouses); //get houses belong to a user
houseRouter.post('/api/v1/house', verifyJwtToken, houseController.createHouse); //create a new house
houseRouter.delete('/api/v1/house/:id', verifyJwtToken, houseController.deleteHouse); //delete a house
houseRouter.get('/api/v1/house/:id/room', verifyJwtToken, houseController.getRooms); //get rooms belong to a house
houseRouter.post('/api/v1/house/room', verifyJwtToken, houseController.createRoom); //create a new room
houseRouter.delete('/api/v1/house/room', verifyJwtToken, houseController.deleteRoom); //delete a room

module.exports = houseRouter;
