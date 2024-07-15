const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({

    FirstName: String,
    LastName: String,
    id: Number,
    password: String,
    email: String,
    Gender: String,
    Age: String,
    Phone: Number,
    Roll: String,
    Birthdate: Date,
    otp: String,

});
const User = mongoose.model("users", regSchema);
module.exports = { User };