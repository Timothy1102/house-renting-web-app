const database = require('../db');
const bcrypt = require('bcrypt');
const { encryptPassword, generateJwtToken} = require('../services/auth.service');

/**
 * Controller for authentication & authorization
 */
class AuthController {

    saltRounds = 10;

    /**
     * Register a new user
     */
    async register(req, res) {
        try {
            // 1. destructure the req.body (name, email, password)
            const { userName, email, password } = req.body;

            // 2. check if user exists (if user exist then throw error)
            const user = await database.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
            if (user.rows.length > 0) {
                return res.status(401).send('Email already registered!');
            }

            // 3. encrypt user password
            const encryptedPassword = await encryptPassword(password);

            // 4. enter the new user inside our database
            const newUser = await database.query(
                'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [userName, email, encryptedPassword]
            );

            // 5. generating our jwt token
            const userId = newUser.rows[0].id;
            const jwtToken = generateJwtToken(userId);

            res.json({user: newUser.rows[0], jwtToken: jwtToken});

            // 6. then send the token to client
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({status: 400, error: err});
        }
    }

    /**
     * login user
     */
    async login(req, res) {
        try {
            // 1. destructure the req.body
            const { email, password } = req.body;
            // 2. check if user doesn't exist (if not then we throw error)
            const user = await database.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
            if (user.rows.length === 0) {
                return res.status(401).send('Email does not exist!');
            }

            // 3. check if incoming password is the same as the database password
            const validPassword = await bcrypt.compare(
                password,
                user.rows[0].password
            );
            if (!validPassword) {
                return res.status(401).send('Password is not correct!');
            }

            // 4. give them the jwt token
            const userId = user.rows[0].id;
            const jwtToken = generateJwtToken(userId);

            res.json({user: user.rows[0], jwtToken: jwtToken});
        } catch (err) {
            console.error(err.message);
            return res.status(400).send({status: 400, error: err});
        }
    }

    /**
     * return the status authorized of user
     */
    userAuthorized(req, res) {
        res.status(200).json({isAuthorized: true});
    }
}

module.exports = AuthController;
