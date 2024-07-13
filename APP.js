const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passwordValidator = require("password-validator");
// const User = require('./Database/User.js').User;
// const req1 = require('./Database/sreq.js').reqs;
// const req2 = require('./Database/freq.js').req2;
const contact = require('./Database/cont.js').contact;
const cookieParser = require("cookie-parser");
const { setCookie, readCookie, editCookie, deleteCookie } = require("./cookies");

const app = express();
const saltRounds = 10;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');
const passwordSchema = new passwordValidator();
passwordSchema
    .is().max(15)
    .is().min(7)
    .has().uppercase()
    .has().not().spaces()
    .has().digits(2);

app.get('/', (req, res) => {
    res.render('HomePage');
});


app.get('/contact', async(req, res) => {
    try {
        const users = await contact.find({});
        res.render('contact', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving projects");
    }
});



app.get('/HomePage', (req, res) => {
    res.render('HomePage');
});


module.exports = app;