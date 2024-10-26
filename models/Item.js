const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3, // Optional: Minimum length for name
    },
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    }
}, { 
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create an index on categoryId for faster queries
itemSchema.index({ categoryId: 1 });

module.exports = mongoose.model('Item', itemSchema);
