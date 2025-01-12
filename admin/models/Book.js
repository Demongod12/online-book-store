const db = require("../config/db");

class Book {
  static create(
    {
      name,
      author,
      description,
      price,
      page_count,
      isbn,
      language,
      image_url,
      weight,
      stock_status,
      is_bestseller,
      discount,
    },
    callback
  ) {
    const query =
      "INSERT INTO Books (name, author, description, price, page_count, isbn, language, image_url, weight, stock_status, is_bestseller, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      author,
      description,
      price,
      page_count,
      isbn,
      language,
      image_url,
      weight,
      stock_status,
      is_bestseller,
      discount,
    ];
    db.query(query, values, callback);
  }

  static findAll(callback) {
    const query = "SELECT * FROM Books";
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = "SELECT * FROM Books WHERE book_id = ?";
    db.query(query, [id], callback);
  }

  static update(
    id,
    {
      name,
      author,
      description,
      price,
      page_count,
      isbn,
      language,
      image_url,
      weight,
      stock_status,
      is_bestseller,
      discount,
    },
    callback
  ) {
    const query = `
      UPDATE Books 
      SET name = ?, author = ?, description = ?, price = ?, page_count = ?, isbn = ?, language = ?, image_url = ?, weight = ?, stock_status = ?, is_bestseller = ?, discount = ?
      WHERE book_id = ?`;
    const values = [
      name,
      author,
      description,
      price,
      page_count,
      isbn,
      language,
      image_url,
      weight,
      stock_status,
      is_bestseller,
      discount,
      id,
    ];
    db.query(query, values, callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM Books WHERE book_id = ?';
    db.query(query, [id], callback);
  }

  static filterByStockStatus(status, callback) {
    const query = 'SELECT * FROM Books WHERE stock_status = ?';
    db.query(query, [status], callback);
  }
}

module.exports = Book;
