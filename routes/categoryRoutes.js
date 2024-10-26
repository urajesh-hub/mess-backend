const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to add a category
router.post('/', categoryController.addCategory);

// Route to get all categories
router.get('/', categoryController.getAllCategories);

// Route to update a category by ID
router.put('/:id', categoryController.updateCategory);

// Route to delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

