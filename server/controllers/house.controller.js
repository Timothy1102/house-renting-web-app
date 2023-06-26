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
     * Create a new house
     */
    async createHouse(req, res) {
        try {
            const houseImagePaths = req.files.map(file => file.path);
            const houseData = {
                title: req.body.title,
                address: req.body.address,
                images: houseImagePaths,
            }
            const house = await House.create(houseData);
            const user = await User.findByPk(req.user.userId);
            await user.addHouse(house);
            res.json(house);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * Create a new house
     */
    async deleteHouse(req, res) {
        try {
            const houseId = req.params.id;
            const house = await House.findByPk(houseId);
            await house.destroy();
            res.json({ msg: 'House deleted' });
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
            const houseId = req.params.id;
            const user = await User.findByPk(req.user.userId, {include: {model: House, include: Room}});
            // Access the user's rooms
            for (const house of user.Houses) {
                if (house.id == houseId) {
                    return res.json(house.Rooms);
                }
            }
            res.json({msg: 'Could not find house with that id.'});
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * Create a new room
     */
    async createRoom(req, res) {
        try {
            const houseId = req.body.houseId;
            const roomImagePaths = req.files.map(file => file.path);
            const roomData = {
                title: req.body.title,
                price: req.body.price,
                floor: req.body.floor,
                area: req.body.area,
                electricPrice: req.body.electricPrice,
                waterPrice: req.body.waterPrice,
                description: req.body.description,
                utilities: JSON.parse(req.body.utilities),
                images: roomImagePaths,
            }
            const room = await Room.create(roomData);
            const house = await House.findByPk(houseId);
            await house.addRoom(room);
            res.json(room);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * Delete a room
     */
    async deleteRoom(req, res) {
        try {
            const room = await Room.findByPk(req.body.roomId);
            await room.destroy();
            res.json({ msg: 'Room deleted' });
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }
}

module.exports = HouseController;
