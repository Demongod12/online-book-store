const db = require('../config/db');

class Genre {
    static create(name, callback) {
        const query = 'INSERT INTO Genres (name) VALUES (?)';
        db.query(query, [name], callback);
    }

    static findAll(callback) {
        const query = 'SELECT * FROM Genres';
        db.query(query, callback);
    }

    static findById(id, callback) {
        const query = 'SELECT * FROM Genres WHERE genre_id = ?';
        db.query(query, [id], callback);
    }

    static update(id, name, callback) {
        const query = 'UPDATE FROM Genres WHERE genre_id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Genre;