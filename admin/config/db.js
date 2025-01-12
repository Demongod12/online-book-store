const mysql = require('mysql');

// Create the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your XAMPP MySQL password
  database: 'bookstore',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = { db };
