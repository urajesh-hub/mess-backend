const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

