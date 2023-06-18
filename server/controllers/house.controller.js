const { House, User } = require('../sequelize/models');

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
}

module.exports = HouseController;
