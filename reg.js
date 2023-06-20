const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


// Create a MySQL connection
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'XXXXX',
  password: 'XXXXXXXXXX',
  database: 'registration'
});

// Connect to the MySQL server
conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server');
});

// Create an Express app
const httphandle = express();

// Configure the app to use body-parser for parsing request bodies
httphandle.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling the registration form submissions
httphandle.post('/reg.js', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const emailcheck = 'SELECT COUNT(*) as count FROM Users WHERE email = ?';
    conn.query(emailcheck, [email], async (err, result) => {
      if (err) throw err;

      const emailexists = result[0].count > 0;

      if (emailexists) {
        // Email already exists, display an error message
        res.send('Email already exists');
      } else {
        // Hash the password
        const hashedpass = await bcrypt.hash(password, 10);

        // Insert the user information into the Users table
        const adduser = 'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)';
        const values = [name, email, hashedpass];

        conn.query(adduser, values, (err, result) => {
          if (err) throw err;
          console.log('User registered successfully');

          // Redirect the user to a success page or send a success response
          res.send('Registration successful!');
        });
      }
    });
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.send('Registration failed!');
  }
});


// Start the server
httphandle.listen(44444, () => {
  console.log('Server started on port 44444');
});



