require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // SQLite library
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend address
  credentials: true
}));

// SQLite connection
const db = new sqlite3.Database('process.env.DB_FILE', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err);
    return;
  }
  console.log('Connected to SQLite');

  // Create the table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS reg (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Username TEXT NOT NULL UNIQUE,
      Password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table reg created or already exists.');
  });
});

// Registration route
app.post('/register', (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  db.get('SELECT * FROM reg WHERE Username = ?', [user], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking user.' });
    }
    if (row) {
      return res.status(409).json({ message: 'Username taken' });
    }

    db.run('INSERT INTO reg (Username, Password) VALUES (?, ?)', [user, pwd], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error registering user.' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  db.get('SELECT * FROM reg WHERE Username = ? AND Password = ?', [user, pwd], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking login credentials.' });
    }
    if (!row) {
      return res.status(401).json({ message: 'Incorrect Username or Password' });
    }

    res.status(200).json({ message: 'Login successful', accessToken: 'fake-jwt-token', roles: ['user'] });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
