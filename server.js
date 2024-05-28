const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mariadb = require('mariadb');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = mariadb.createPool({
  host: 'mariadb_host', // ganti dengan host database Anda
  user: 'username',     // ganti dengan username database Anda
  password: 'password', // ganti dengan password database Anda
  database: 'crud_app'
});

app.get('/items', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM items');
    conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.post('/items', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO items (name) VALUES (?)', [req.body.name]);
    conn.end();
    res.status(201).json({ id: result.insertId, name: req.body.name });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    conn.end();
    res.status(204).end();
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
