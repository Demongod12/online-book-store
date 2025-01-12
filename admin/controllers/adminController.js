const bookController = require("./bookController");
const db = require("../config/db");

//Admin manage books page
exports.manageBooks = (req, res) => {
  //Fetch all books for the admin panel
  bookController.getAllBooks(req, res);
};

//Add book (admin can call bookController to add book)
exports.addBook = (req, res) => {
  bookController.addBook(req, res);
};

//Edit book (admin can call bookController to edit book)
exports.editBook = (req, res) => {
  bookController.editBook(req, res);
};

//Delete book (admin can call bookController to delete book)
exports.deleteBook = (req, res) => {
  bookController.deleteBook(req, res);
};

//Admin user management page
exports.viewUsers = (req, res) => {
  const query = "SELECT * FROM Users";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

//Admin manage featured books
exports.manageFeaturedBooks = (req, res) => {
  const query = "SELECT * FROM FeaturedBooks";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};
