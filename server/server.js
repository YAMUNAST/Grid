const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/active', (req, res) => {
  db.query('SELECT * FROM clicks LIMIT 1', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.post('/click', (req, res) => {
  const { button } = req.body;
  const cols = Array.from({ length: 9 }, (_, i) => `btn${i + 1}`);
  const updates = cols.map(col => `${col} = ${col === `btn${button}` ? 1 : 0}`).join(', ');

  db.query(`UPDATE clicks SET ${updates}`, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
