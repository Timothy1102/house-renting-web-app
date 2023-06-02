const { User } = require('../sequelize/models');

class UserController {
    /**
     * Get all users
     */
    async getUsers(req, res) {
        try {
            const users =  await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({ status: 400, error: err });
        }
    }

    /**
     * return the user that is logged in
     */
    houseOwnerAuthorized(req, res) {
        res.json({houseOwner: req.user}); // req.user is set in the authorization middleware
    }
}

module.exports = UserController;
