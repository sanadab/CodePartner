// database.js
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/?retryWrites=true&w=majority'; // Replace with your actual MongoDB URI

async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Optionally, handle error or retry logic here
    }
}

module.exports = { connectToDatabase };