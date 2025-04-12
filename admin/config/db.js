const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",         // no password
  database: "bookstore",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database");

  // Optional: Test with a real query
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.log('Books data:', results);
    }

    // End connection after test
    db.end();
  });
});

module.exports = db;
