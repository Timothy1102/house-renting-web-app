const { House, Room, User } = require('../sequelize/models');

class HouseController {
    /**
     * Get all houses that belong to a user
     */
    async getHouses(req, res) {
        try {
            const user = await User.findByPk(req.user.userId, {include: House});
            res.json(user.Houses);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * create a new house
     */
    async createHouse(req, res) {
        try {
            const house = await House.create(req.body);
            const user = await User.findByPk(req.user.userId);
            await user.addHouse(house);
            res.json(house);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * Get all rooms that belong to a house
     */
    async getRooms(req, res) {
        try {
            const user = await User.findByPk(req.user.userId, {include: {model: House, include: Room}});
            // Access the user's rooms
            const rooms = user.Houses.flatMap((house) => house.Rooms);
            res.json(rooms);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * create a new room
     */
    async createRoom(req, res) {
        try {
            const room = await Room.create(req.body);
            const house = await House.findByPk(req.body.houseId);
            await house.addRoom(room);
            res.json(room);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }
}

module.exports = HouseController;
