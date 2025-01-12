const db = require("../config/db");

// Add a new book
exports.addBook = (req, res) => {
  const {
    name,
    author,
    description,
    price,
    page_count,
    isbn,
    language,
    genre, // genre as a simple text field
    image_url,
    weight,
    stock_status = "in_stock",
    is_bestseller = false,
    discount = 0.0,
    featured_section,
  } = req.body;

  const query =
    "INSERT INTO Books (image_url, name, author, description, price, page_count, weight, isbn, language, stock_status, is_bestseller, discount, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      image_url,
      name,
      author,
      description,
      price,
      page_count,
      weight,
      isbn,
      language,
      stock_status,
      is_bestseller,
      discount,
      genre, // store genre as a text
    ],
    (err, result) => {
      if (err) throw err;
      const book_id = result.insertId;

      // Optionally add the book to the featured section
      if (featured_section) {
        const featuredQuery =
          "INSERT INTO FeaturedBooks (book_id, section) VALUES (?, ?)";
        db.query(featuredQuery, [book_id, featured_section], (err, result) => {
          if (err) throw err;
        });
      }

      res.redirect("/admin/manage-books");
    }
  );
};

// Get all books (for admin panel or user view)
exports.getAllBooks = (req, res) => {
  const query = "SELECT * FROM Books";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result); // Fixed 'results' to 'result'
  });
};

// Edit book details
exports.editBook = (req, res) => {
  const {
    book_id,
    name,
    author,
    description,
    price,
    page_count,
    isbn,
    language,
    stock_status,
    is_bestseller,
    discount,
    genre, // genre as a text field
    image_url,
    weight,
  } = req.body;

  // Update book details in Books table
  const query =
    "UPDATE Books SET name = ?, author = ?, description = ?, price = ?, page_count = ?, isbn = ?, language = ?, stock_status = ?, is_bestseller = ?, discount = ?, image_url = ?, weight = ?, genre = ? WHERE book_id = ?";

  db.query(
    query,
    [
      name,
      author,
      description,
      price,
      page_count,
      isbn,
      language,
      stock_status,
      is_bestseller,
      discount,
      image_url,
      weight,
      genre, // update genre as text
      book_id,
    ],
    (err, result) => {
      if (err) throw err;
      res.redirect("/admin/manage-books");
    }
  );
};

// Delete a book
exports.deleteBook = (req, res) => {
  const { book_id } = req.params;

  // Delete book from Books table
  const query = "DELETE FROM Books WHERE book_id = ?";
  db.query(query, [book_id], (err, result) => {
    if (err) throw err;
    res.redirect("/admin/manage-books");
  });
};
