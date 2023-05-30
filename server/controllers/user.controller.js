const database = require('../db');

class UserController {
    /**
     * Get all users
     */
    async getUsers(req, res) {
        try {
            const allRows = await database.query('SELECT * FROM users');
            res.json(allRows.rows);
        } catch (err) {
            console.error(err.message);
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
