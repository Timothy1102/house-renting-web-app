const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

// This code is used to verify a jwt token. If the token is valid, then the request is allowed to proceed.
// If the token is not valid, then an error is returned.
const verifyJwtToken = (req, res, next) => {
    try {
        const jwtToken = req.headers['token'];
        if (!jwtToken) {
            return res.status(401).send({ auth: false, message: 'No jwt token provided.' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        jwt.verify(jwtToken, jwtSecret, function (err, decoded) {
            if (err) {
                return res.status(401).send({ auth: false, message: 'Jwt token is not valid.' });
            }
            // if everything good, save to request for use in other routes
            req.user = decoded.user;
            next();
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({status: 500, error: err});
    }
}

module.exports = verifyJwtToken;
