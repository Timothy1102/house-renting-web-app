const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(process.cwd(), '../.env')});
const express = require('express');
const cors = require('cors');
const database = require('./db');
const authRouter = require('./routes/auth.route');
const houseOwnerRoute = require('./routes/house-owner.route');
const testRouter = require('./routes/test.route');
const { sequelize } = require('./sequelize/models');
const { User } = require('./sequelize/models');

const app = express();
const port = process.env.SERVER_PORT;

//middleware
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to access req.body
app.use(authRouter); //to access auth routes
app.use(houseOwnerRoute); //to access test routes
app.use(testRouter); //to access test routes

const connectDatabase = async () => {
    try {
        console.log('Checking database connection status...');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

// Routes
// Create a new row in the "user" table
app.post('/api/v1/test', async (req, res) => {
    try {
        const { role, name, email, password } = req.body;
        const newRow = await User.create({
            role: role,
            name: name,
            email: email,
            password: password,
        });
        res.json(newRow);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send({ status: 400, error: err });
    }
});

// Get all rows from the "user" table
app.get('/api/v1/test', async (req, res) => {
    try {
        const allRows = await User.findAll();
        res.json(allRows);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send({ status: 400, error: err });
    }
});

// Get a single row from the "user" table
app.get('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id: id,
            },
        });

        if (!user) {
            return res.status(400).send({ status: 400, error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send({ status: 400, error: err });
    }
});

// Update a row in the "user" table
app.put('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role, name, email, password } = req.body;
        await User.update(
            {
                role: role,
                name: name,
                email: email,
                password: password,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        res.json('User info was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a row from the "user"
app.delete('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: {
              id: id,
            },
          });
        res.json('Row was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

(async () => {
    await connectDatabase();
    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
})();
