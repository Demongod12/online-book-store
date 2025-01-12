const db = require('../config/db');

// Add a book to the cart
exports.addToCart = (req, res) => {
  const { user_id } = req.body;  // Assuming user_id comes from the authenticated user
  const { book_id, quantity } = req.body;  // book_id and quantity should come from the request body

  // Check if the user is admin, if so, reject the action
  if (req.user && req.user.role === 'admin') {
    return res.status(403).json({ message: 'Admins cannot modify the cart' });
  }

  // Check if the book already exists in the user's cart
  const checkQuery = "SELECT * FROM Cart WHERE user_id = ? AND book_id = ?";
  db.query(checkQuery, [user_id, book_id], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      // If the book is already in the cart, increase the quantity
      const newQuantity = result[0].quantity + quantity;
      const updateQuery = "UPDATE Cart SET quantity = ? WHERE user_id = ? AND book_id = ?";
      db.query(updateQuery, [newQuantity, user_id, book_id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Cart updated successfully', newQuantity });
      });
    } else {
      // If the book is not in the cart, add it
      const insertQuery = "INSERT INTO Cart (user_id, book_id, quantity) VALUES (?, ?, ?)";
      db.query(insertQuery, [user_id, book_id, quantity], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Book added to cart successfully' });
      });
    }
  });
};

// Delete a book from the cart
exports.deleteFromCart = (req, res) => {
  const { user_id } = req.body;  // Assuming user_id comes from the authenticated user
  const { book_id } = req.params;  // book_id from request params

  // Check if the user is admin, if so, reject the action
  if (req.user && req.user.role === 'admin') {
    return res.status(403).json({ message: 'Admins cannot modify the cart' });
  }

  const deleteQuery = "DELETE FROM Cart WHERE user_id = ? AND book_id = ?";
  db.query(deleteQuery, [user_id, book_id], (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found in cart' });
    }

    res.status(200).json({ message: 'Book removed from cart successfully' });
  });
};

// Get all books in the user's cart
exports.getCart = (req, res) => {
  const { user_id } = req.body;  // Assuming user_id comes from the authenticated user

  // Check if the user is admin, if so, reject the action
  if (req.user && req.user.role === 'admin') {
    return res.status(403).json({ message: 'Admins cannot view the cart' });
  }

  const query = "SELECT Cart.cart_id, Books.name, Books.author, Cart.quantity, Books.price FROM Cart JOIN Books ON Cart.book_id = Books.book_id WHERE Cart.user_id = ?";
  db.query(query, [user_id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result);  // Return cart details (book name, author, quantity, price)
  });
};
