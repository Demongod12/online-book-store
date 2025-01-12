const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { db } = require('./admin/config/db');
const userController = require('./admin/controllers/userController');
const adminController = require('./admin/controllers/adminController');
const { authMiddleware, adminMiddleware } = require('./admin/middlewares/authMiddleware');
const app = express();
const cors = require('cors');

app.use(cors());


// Set up the body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up static file serving
app.use(express.static(path.join(__dirname, 'client'))); // Adjust the path as needed

// Set the view engine to render HTML
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Routes
// Home Route (for the user)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Login Route
app.post('/login', userController.loginUser);

// User Cart Routes
app.post('/add-to-cart', authMiddleware, (req, res) => {
  const { user_id, book_id } = req.body;
  const query = 'INSERT INTO Cart (user_id, book_id, quantity) VALUES (?, ?, 1)';

  db.query(query, [user_id, book_id], (err, results) => {
    if (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).send('Failed to add to cart');
    }
    res.status(200).send('Added to cart');
  });
});

app.post('/remove-from-cart', authMiddleware, (req, res) => {
  const { user_id, book_id } = req.body;
  const query = 'DELETE FROM Cart WHERE user_id = ? AND book_id = ?';

  db.query(query, [user_id, book_id], (err, results) => {
    if (err) {
      console.error('Error removing from cart:', err);
      return res.status(500).send('Failed to remove from cart');
    }
    res.status(200).send('Removed from cart');
  });
});

// Admin Routes (protected by middleware)
app.use('/admin', authMiddleware); // Protect all admin routes

// Admin Dashboard Route
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

// Admin Book Management Routes
app.get('/admin/manage-books', adminController.manageBooks);
app.post('/admin/add-book', adminMiddleware, adminController.addBook);
app.post('/admin/edit-book', adminMiddleware, adminController.editBook);
app.post('/admin/delete-book', adminMiddleware, adminController.deleteBook);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
