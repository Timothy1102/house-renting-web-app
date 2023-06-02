const database = require("../db");
const bcrypt = require("bcrypt");
const {
	encryptPassword,
	generateJwtToken,
} = require("../services/auth.service");
const { User } = require('../sequelize/models');

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
			// 1. destructure the req.body (role, name, email, password)
			const { role, name, email, password } = req.body;

			// 2. check if user exists (if user exist then throw error)
			const user = await User.findOne({
				where: {
					email: email,
				},
			});
			if (user) {
				return res.status(401).send("Email already registered!");
			}

			// 3. encrypt user password
			const encryptedPassword = await encryptPassword(password);

			// 4. store the new user inside our database
			const newUser = await User.create({
				role: role,
				name: name,
				email: email,
				password: encryptedPassword,
			});

			// 5. generating our jwt token
			const userId = newUser.id;
			const jwtToken = generateJwtToken(userId, role, name, email);

			res.json({ user: newUser, jwtToken: jwtToken });

			// 6. then send the token to client
		} catch (err) {
			console.error(err.message);
			return res.status(400).send({ status: 400, error: err });
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
			const user = await User.findOne({
				where: {
					email: email,
				},
			});
			if (!user) {
				return res.status(401).send("Email does not exist!");
			}

			// 3. check if incoming password is the same as the database password
			const validPassword = await bcrypt.compare(
				password,
				user.password
			);
			if (!validPassword) {
				return res.status(401).send("Password is not correct!");
			}

			// 4. give them the jwt token
			const jwtToken = generateJwtToken(
				user.id,
				user.role,
				user.name,
				email
			);

			res.json({ user: user, jwtToken: jwtToken });
		} catch (err) {
			console.error(err.message);
			return res.status(400).send({ status: 400, error: err });
		}
	}

	/**
	 * return the status authenticated and user info
	 */
	userAuthenticated(req, res) {
		res.status(200).json({ isAuthenticated: true, user: req.user });
	}
}

module.exports = AuthController;
