//link node.js to database
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstore'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected to the database');
});

module.exports = connection;