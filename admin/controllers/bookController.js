const db = require("../config/db");

exports.addBook = (req, res) => {
  const {
    name,
    author,
    description,
    price,
    page_count,
    isbn,
    language,
    category_id,
    genre_id,
    image_url,
    weight,
    stock_status = "in_stock",
    is_bestseller = false,
    discount = 0.0,
    featured_section,
  } = req.body;

  const query =
    "INSERT INTO Books (image_url, name, author, description, price, page_count, weight, isbn, language, stock_status, is_bestseller, discount)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
    ],
    (err, result) => {
      if (err) throw err;
      const book_id = result.insertId;

      //link book to category
      const categoryQuery =
        "INSERT INTO BookCategories (book_id, category_id) VALUES (?, ?)";
      db.query(categoryQuery, [book_id, category_id], (err, result) => {
        if (err) throw err;
      });

      //link book to genre
      const genreQuery =
        "INSERT INTO BookGenres (book_id, genre_id) VALUES (?, ?)";
      db.query(genreQuery, [book_id, genre_id], (err, result) => {
        if (err) throw err;
      });

      //optionally added book to featured section
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

//Get all books (for admin panel or user view)
exports.getAllBooks = (req, res) => {
  const query = "SELECT * FROM Books";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(results);
  });
};

//Edit books details
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
    category_id,
    genre_id,
    image_url,
    weight,
  } = req.body;

  // Update book details in Books table
  const query =
    "UPDATE Books SET name = ?, author = ?, description = ?, price = ?, page_count = ?, isbn = ?, language = ?, stock_status = ?, is_bestseller = ?, discount = ?, image_url = ?, weight = ?WHERE book_id = ?;";
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
      book_id,
    ],
    (err, result) => {
      if (err) throw err;

      // Update category and genre links
      const categoryQuery =
        "UPDATE BookCategories SET category_id = ? WHERE book_id = ?";
      db.query(categoryQuery, [category_id, book_id], (err, result) => {
        if (err) throw err;
      });

      const genreQuery = "UPDATE BookGenres SET genre_id = ? WHERE book_id = ?";
      db.query(genreQuery, [genre_id, book_id], (err, result) => {
        if (err) throw err;
      });

      res.redirect("/admin/manage-books");
    }
  );
};


//Delete a book
exports.deleteBook = (req, res) =>{
    const {book_id} = req.params;

    //Delete book from Books table
    const query = "DELETE FROM Books WHERE book_id = ?";
    db.query(query, [book_id], (err, result) =>{
        if (err) throw err;
        res.redirect("/admin/manage-books");
    });
};