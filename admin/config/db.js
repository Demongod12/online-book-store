const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database");
});

// Example query
connection.query('SELECT * FROM your_table', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log('Query results:', results);
  }
});

// Close the connection
connection.end();

module.exports = db;
