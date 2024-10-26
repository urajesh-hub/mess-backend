// controllers/reportController.js
const Feedback = require('../models/Feedback'); // Ensure the path is correct
const Category = require('../models/Category'); // Import the Category model
const ExcelJS = require('exceljs');

exports.downloadReport = async (req, res) => {
    try {
        // Fetch all feedback data from the database
        const feedbackData = await Feedback.find().populate('itemId'); // Populate to get item details

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Feedback Report');

        // Define columns
        worksheet.columns = [
            { header: 'Item Name', key: 'itemName', width: 30 },
            { header: 'Category', key: 'category', width: 20 }, // New category column
            { header: 'Rating', key: 'rating', width: 10 },
            { header: 'Feedback', key: 'feedback', width: 50 },
            { header: 'Date', key: 'date', width: 15 }, // New date column
            { header: 'Time', key: 'time', width: 15 }, // New time column
        ];

        // Add rows to the worksheet
        for (const feedback of feedbackData) {
            // Get category name from the item's category
            const category = feedback.itemId ? await Category.findById(feedback.itemId.categoryId) : null;

            // Convert feedback date to Indian Standard Time (IST)
            const istDate = new Date(feedback.date).toLocaleDateString('en-IN'); // Format date
            const istTime = new Date(feedback.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format time

            worksheet.addRow({
                itemName: feedback.itemId ? feedback.itemId.name : 'Unknown Item',
                category: category ? category.name : 'Unknown Category', // Use category name
                rating: feedback.rating,
                feedback: feedback.feedback,
                date: istDate, // Separate date column
                time: istTime, // Separate time column
            });
        }

        // Set response headers for Excel file download
        res.setHeader('Content-Disposition', 'attachment; filename=feedback_report.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Write the Excel file to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send({ error: 'Error generating report' });
    }
};
