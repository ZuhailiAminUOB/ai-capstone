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

// MySQL connection, make sure you have MySQL installed 
const db = mysql.createConnection({
  host: 'localhost', // or your database host
  user: 'root', // your MySQL username
  password: 'root', // your MySQL password
});

// Connect to MySQL and create the database if it doesn't exist
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS registerdb', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database registerdb created or already exists.');

    // Use the database
    db.query('USE registerdb', (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Using database registerdb');

      // Create the reg table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS reg (
          id INT AUTO_INCREMENT PRIMARY KEY,
          Username VARCHAR(255) NOT NULL UNIQUE COLLATE utf8_bin,
          Password VARCHAR(255) NOT NULL COLLATE utf8_bin
        )`;
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table reg created or already exists.');
      });
    });
  });
});


//login
app.post('/login', (req, res) => {
  const { user, pwd } = req.body;

  // Validate user and password input
  if (!user || !pwd) {
      return res.status(400).json({ message: 'Username and password are required.' });
  }

  const checkLoginQuery = 'SELECT * FROM reg WHERE BINARY Username = ? AND BINARY Password = ?'; // Ensure BINARY for both Username and Password
  db.query(checkLoginQuery, [user, pwd], (err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Error checking login credentials.' });
      }
      if (results.length === 0) {
          return res.status(401).json({ message: 'Incorrect Username or Password' });
      }
  
      // If login is successful
      return res.status(200).json({ 
          message: 'Login successful', 
          accessToken: 'fake-jwt-token', 
          roles: ['user'] 
      });
  });
});


// Registration route
app.post('/register', (req, res) => {
  const { user, pwd } = req.body;

  // Validate user and password input
  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if username already exists
  const checkUserQuery = 'SELECT * FROM reg WHERE Username = ?';
  db.query(checkUserQuery, [user], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user.' });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Username taken' });
    }

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO reg (Username, Password) VALUES (?, ?)';
      db.query(insertUserQuery, [user, pwd], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering user.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      });
    });
  });


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});