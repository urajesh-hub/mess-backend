const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to add a new item
router.post('/', itemController.addItem);

// Route to get all items
router.get('/', itemController.getAllItems);

// Route to update an item by ID
router.put('/:id', itemController.updateItem);

// Route to delete an item by ID
router.delete('/:id', itemController.deleteItem);

// Route to get items by category ID
router.get('/:categoryId', itemController.getItemsByCategory);

module.exports = router;
