const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware} = require('../middlewares/authMiddleware');
const bookController = require('../controllers/bookController');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

//admin routes, all protected by authMiddleware and adminMiddleware

//manage Books
router.post('/add-book', authMiddleware, adminMiddleware, bookController.addBook);
router.get('/manage-books', authMiddleware, adminMiddleware, bookController.getAllBooks);
router.get('/edit-book/:id', authMiddleware, adminMiddleware,bookController.getBookById);
router.put('/update-book/:id', authMiddleware, adminMiddleware ,bookController.updateBook);
router.delete('/delete-book/:id', authMiddleware, adminMiddleware, bookController.deleteBook);