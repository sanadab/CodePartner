const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({

    api_key: String


});
const api = mongoose.model("api", regSchema);
module.exports = { api };