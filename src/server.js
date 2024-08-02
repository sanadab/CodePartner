const app = require('./APP.js'); // Assuming this is your Express app configuration

const express = require('express');
const axios = require('axios');
const Bottleneck = require('bottleneck');
const mongoose = require('mongoose');

// Initialize Express app
// const app = express();



// Connect to MongoDB
mongoose.connect('mongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



// Start the server
const port = 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});