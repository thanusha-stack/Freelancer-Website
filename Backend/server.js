// server.js
const express = require('express');
const app = express();
const db = require('./db'); // Import database connection
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Example route to get all jobs
app.get('/jobs', (req, res) => {
  db.query('SELECT * FROM jobs', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json(results);
  });
});

// Example route to add a new job
app.post('/jobs', (req, res) => {
  const { title, description, salary, location } = req.body;
  const query = 'INSERT INTO jobs (title, description, salary, location) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, salary, location], (error, result) => {
    if (error) return res.status(500).json({ error });
    res.status(201).json({ message: 'Job created', jobId: result.insertId });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
