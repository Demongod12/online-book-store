const db = require('../config/db');

class Category {
    static create(name, callback) {
        const query = 'INSERT INTO Categories (name) VALUES (?)';
        db.query(query, [name], callback);
    }

    static findAll(callback) {
        const query = 'SELECT * FROM Categories';
        db.query(query, callback);
    }

    static findById(id, callback) {
        const query = 'SELECT * FROM Categories WHERE category_id = ?';
        db.query(query, [id], callback);
    }

    static update(id, name, callback) {
        const query = 'UPDATE Categories SET name = ?, WHERE category_id = ?';
        db.query(query, [name, id], callback);
    }

    static delete(id, callback){
        const query = 'DELETE FROM Categories WHERE category_id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Category;