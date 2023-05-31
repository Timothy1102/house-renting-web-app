const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

// The encryptPassword function takes a password as input and returns
// an encrypted version of that password.
//
// The saltRounds variable determines the number of rounds of hashing
// that are performed. The higher the number of rounds, the longer it
// takes to compute the hash. This helps prevent attackers from
// brute-forcing the password.
//
// The salt is a random string that is used to help prevent attackers
// from brute-forcing the password.
async function encryptPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
};

// This function generates a JWT token for the user. It uses the jwt library to do so.
// The token is generated using the user's id, name, and email.
// The token is signed using the JWT secret and expires after the JWT expires in time.
// The JWT is then returned to the caller.
function generateJwtToken(userId, role, name, email) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    const payload = {
        user: {
            userId: userId,
            role: role,
            name: name,
            email: email
        }
    };

    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}

module.exports = { encryptPassword, generateJwtToken };
