const Category = require('../models/Category');

// Add a category
exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        console.error('Error adding category:', error); // Log error for debugging
        res.status(400).send({ error: "Error adding category" });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        console.error('Error fetching categories:', error); // Log error for debugging
        res.status(500).send({ error: "Error fetching categories" });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            { name: req.body.name }, 
            { new: true, runValidators: true } // runValidators to ensure validation checks
        );

        if (!category) {
            return res.status(404).send({ error: "Category not found" });
        }
        res.send(category);
    } catch (error) {
        console.error('Error updating category:', error); // Log error for debugging
        res.status(400).send({ error: "Error updating category" });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send({ error: "Category not found" });
        }
        res.send({ message: "Category deleted successfully" });
    } catch (error) {
        console.error('Error deleting category:', error); // Log error for debugging
        res.status(500).send({ error: "Error deleting category" });
    }
};
