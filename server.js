const app = require("./APP.js");
const mongoose = require('mongoose');
const db = require('./database.js'); // Assuming this is for database configuration

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/?retryWrites=true&w=majority');


// Start the servers
const listener = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});