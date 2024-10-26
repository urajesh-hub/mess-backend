const Item = require('../models/Item');

// Add a new item
exports.addItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send({ error: "Error adding item" });
    }
};

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: "Error fetching items" });
    }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.send(item);
    } catch (error) {
        res.status(400).send({ error: "Error updating item" });
    }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.send({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Error deleting item" });
    }
};



exports.getItemsByCategory = async (req, res) => {
    try {
        const items = await Item.find({ categoryId: req.params.categoryId }).populate('categoryId');
        res.json(items);
    } catch (error) {
        console.error('Error fetching items by category:', error);
        res.status(500).send('Server error');
    }
};

