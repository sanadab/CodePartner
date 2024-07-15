const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Message: { type: String, required: true },
});

const contact = mongoose.model('contact', contactSchema);

module.exports = { contact };