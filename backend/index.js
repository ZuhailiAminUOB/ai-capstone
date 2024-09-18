const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Frontend address (no `/register`)
  credentials: true // Allow cookies/credentials
}));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // or your database host
  user: 'root', // your MySQL username
  password: 'root', // your MySQL password
  database: 'regdb' // your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Registration route
app.post('/register', (req, res) => {
  const { user, pwd } = req.body;

  // Validate user and password input
  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if username already exists
  const checkUserQuery = 'SELECT * FROM registers WHERE Username = ?';
  db.query(checkUserQuery, [user], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user.' });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Username taken' });
    }

    // Check if password already exists
    const checkPwdQuery = 'SELECT * FROM registers WHERE Password = ?';
    db.query(checkPwdQuery, [pwd], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking password.' });
      }
      if (results.length > 0) {
        return res.status(410).json({ message: 'Password taken' });
      }

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO registers (Username, Password) VALUES (?, ?)';
      db.query(insertUserQuery, [user, pwd], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering user.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      });
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});