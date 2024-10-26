const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.submitFeedback);
router.get('/', feedbackController.getAllFeedback); // New route to get all feedback
router.get('/:categoryId', feedbackController.getFeedbackByCategory);
router.get('/download/report', feedbackController.downloadFeedbackReport);

module.exports = router;
