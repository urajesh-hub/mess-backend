const Feedback = require('../models/Feedback');
const Item = require('../models/Item');
const XLSX = require('xlsx');

exports.submitFeedback = async (req, res) => {
    const { itemId, rating, feedback } = req.body;

    if (!itemId || !rating || !feedback) {
        return res.status(400).send('Item ID, rating, and feedback are required.');
    }

    const feedbackEntry = new Feedback({
        itemId,
        rating,
        feedback,
        date: new Date(), // Ensure date is set to now
    });
    await feedbackEntry.save();
    res.status(201).send(feedbackEntry);
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbackData = await Feedback.find().populate('itemId'); // Populate item details
        res.send(feedbackData);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).send('Server error');
    }
};

exports.getFeedbackByCategory = async (req, res) => {
    try {
        const items = await Item.find({ categoryId: req.params.categoryId });
        const feedback = await Feedback.find({ itemId: { $in: items.map(item => item._id) } }).populate('itemId'); // Ensure we populate itemId
        res.send(feedback);
    } catch (error) {
        console.error('Error fetching feedback by category:', error);
        res.status(500).send('Server error');
    }
};

exports.downloadFeedbackReport = async (req, res) => {
    try {
        const feedbackData = await Feedback.find().populate('itemId');
        const data = feedbackData.map(feedback => ({
            Item: feedback.itemId ? feedback.itemId.name : 'Item not found', // Ensure name is handled
            Rating: feedback.rating,
            Feedback: feedback.feedback,
            Date: feedback.date.toISOString().split('T')[0],
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');

        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=feedback_report.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Server error');
    }
};
