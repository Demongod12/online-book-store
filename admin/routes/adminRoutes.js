/*const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");
const categoryController = require("../controllers/categoryController");
const genreController = require("../controllers/genreController");
const userController = require("../controllers/userController");

// Admin routes, all protected by authMiddleware and adminMiddleware

// Manage Books
router.post("/add-book", authMiddleware, adminMiddleware, bookController.addBook);
router.get("/manage-books", authMiddleware, adminMiddleware, bookController.getAllBooks);
router.get("/edit-book/:id", authMiddleware, adminMiddleware, bookController.getBookById);
router.put("/update-book/:id", authMiddleware, adminMiddleware, bookController.updateBook);
router.delete("/delete-book/:id", authMiddleware, adminMiddleware, bookController.deleteBook);


// Manage Genres
router.post("/add-genre", authMiddleware, adminMiddleware, genreController.addGenre);
router.get("/manage-genres", authMiddleware, adminMiddleware, genreController.getAllGenres);

// Manage Users (For admin to manage users)
router.get("/manage-users", authMiddleware, adminMiddleware, userController.getAllUsers);
router.get("/view-user/:id", authMiddleware, adminMiddleware, userController.getUserById);
router.put("/update-user/:id", authMiddleware, adminMiddleware, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, adminMiddleware, userController.deleteUser);

*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController'); 

// User Routes (For registration and login)
router.post('/register', userController.registerUser); 
router.post('/login', userController.loginUser);

// Book Routes
router.post('/add-book', authMiddleware.verifyAdmin, bookController.addBook); 
router.put('/edit-book/:book_id', authMiddleware.verifyAdmin, bookController.editBook); 
router.delete('/delete-book/:book_id', authMiddleware.verifyAdmin, bookController.deleteBook);
router.get('/manage-books', authMiddleware.verifyAdmin, adminController.manageBooks); 

// User Management (Admin)
router.get('/view-users', authMiddleware.verifyAdmin, adminController.viewUsers); 
router.delete('/delete-user/:user_id', authMiddleware.verifyAdmin, userController.deleteUser); 
router.put('/update-profile', authMiddleware.verifyAdmin, adminController.updateProfile); 

// Featured Books Management
router.get('/manage-featured-books', authMiddleware.verifyAdmin, adminController.manageFeaturedBooks); 

// Cart Controller
router.post('/add-to-cart', authMiddleware.verifyAdmin, cartController.addToCart); 
router.delete('/delete-from-cart/:book_id', authMiddleware.verifyAdmin, cartController.deleteFromCart); 
router.get('/get-cart', authMiddleware.verifyAdmin, cartController.getCart); 

module.exports = router;

