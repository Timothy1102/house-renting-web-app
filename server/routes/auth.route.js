const authRouter = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const validateCredentials = require("../middleware/validateCredentials");
const verifyJwtToken = require("../middleware/authorization");

const basePath = "/api/v1/auth";
const authController = new AuthController();

authRouter.post(
	`${basePath}/register`,
	validateCredentials,
	authController.register
);
authRouter.post(`${basePath}/login`, validateCredentials, authController.login);
authRouter.get(
	`${basePath}/is-authenticated`,
	verifyJwtToken,
	authController.userAuthenticated
);

module.exports = authRouter;
