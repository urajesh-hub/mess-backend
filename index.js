require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
// Use CORS with options
const corsOptions = {
    origin: [
        'https://mess-frond.onrender.com',
        'http://localhost:5173' // Your local frontend for development
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials to be sent
    optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
