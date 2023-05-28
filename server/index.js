const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5005;

//middleware
app.use(cors());
app.use(express.json());


// Routes
// Create a new row in the test_table
app.post('/api/v1/test', async (req, res) => {
    try {
        console.log('body: ', req.body);
        const { name, age } = req.body;
        const newRow = await pool.query(
            'INSERT INTO test_table (name, age) VALUES($1, $2) RETURNING *',
            [name, age]
        );
        res.json(newRow.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all rows from the test_table
app.get('/api/v1/test', async (req, res) => {
    try {
        const allRows = await pool.query('SELECT * FROM test_table');
        res.json(allRows.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single row from the test_table
app.get('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const row = await pool.query('SELECT * FROM test_table WHERE id = $1', [id]);
        res.json(row.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a row in the test_table
app.put('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        const updateRow = await pool.query(
            'UPDATE test_table SET name = $1, age = $2 WHERE id = $3',
            [name, age, id]
        );
        res.json('Row was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a row from the test_table
app.delete('/api/v1/test/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRow = await pool.query('DELETE FROM test_table WHERE id = $1', [id]);
        res.json('Row was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
