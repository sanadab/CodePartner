const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({

    feedback: String


});
const feed = mongoose.model("feed", regSchema);
module.exports = { feed };