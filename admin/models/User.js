const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static create({username, email, password, role}, callback) {
        bcrypt.hash(password, 10, (err, hashedPassword) =>{
            if (err) return callback(err);
            const query = 'INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)';
            const values = [username, email, hashedPassword, role];
            db.query(query, values, callback);
        });
    }

    static findByEmail(email, callback) {
        const query = 'SELECT * FROM Users WHERE email = ?';
        db.query(query, [email], callback);
    }

    static findById(userId, callback) {
        const query = 'SELECT * FROM Users WHERE user_id = ?';
        db.query(query, [userId], callback);
    }

    static update(userId, {username, email, role}, callback) {
        const query = 'UPDATE Users SET username = ?, email = ?, role = ? WHERE user_id = ?';
        db.query(query, [userId], callback);
    }

    static delete(userId, callback) {
        const query = 'DELETE FROM Users WHERE user_id = ?';
        db.query(query,[userId], callback);
    }

    static validatePassword(inputPassword, storedPassword, callback) {
        bcrypt.compare(inputPassword, storedPassword, callback);
    }
}

module.exports = User;