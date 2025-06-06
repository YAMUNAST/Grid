const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Example API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// For any other route, serve index.html (React router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
