const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(process.cwd(), '../.env')});
const express = require('express');
const cors = require('cors');
const database = require('./db');
const authRouter = require('./routes/auth.route');
const houseOwnerRoute = require('./routes/house-owner.route');
const testRouter = require('./routes/test.route');

const app = express();
const port = process.env.SERVER_PORT;

//middleware
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to access req.body
app.use(authRouter); //to access auth routes
app.use(houseOwnerRoute); //to access test routes
app.use(testRouter); //to access test routes


// Routes
// Create a new row in the "user" table
app.post('/api/v1/test', async (req, res) => {
    try {
        console.log('body: ', req.body);
        const { name, age } = req.body;
        const newRow = await database.query(
            'INSERT INTO "user" (name, age) VALUES($1, $2) RETURNING *',
            [name, age]
        );
        res.json(newRow.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all rows from the "user" table
app.get('/api/v1/test', async (req, res) => {
    try {
        const allRows = await database.query('SELECT * FROM users');
        res.json(allRows.rows);
        console.log("🚀 ~ file: index.js:36 ~ app.get ~ allRows:", allRows.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single row from the "user" table
app.get('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const row = await database.query('SELECT * FROM "user" WHERE id = $1', [id]);
        res.json(row.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a row in the "user" table
app.put('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        const updateRow = await database.query(
            'UPDATE "user" SET name = $1, age = $2 WHERE id = $3',
            [name, age, id]
        );
        res.json('Row was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a row from the "user"
app.delete('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRow = await database.query('DELETE FROM "user" WHERE id = $1', [id]);
        res.json('Row was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
