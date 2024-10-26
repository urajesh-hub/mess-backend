// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/download/report', reportController.downloadReport);

module.exports = router;
