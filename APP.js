const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passwordValidator = require("password-validator");
const User = require('./Database/User.js').User;
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
app.get('/Sign-Up', (req, res) => {
    res.render('Sign-Up');
});

app.get('/Sign-Up-Student', (req, res) => {
    res.render('Sign-Up-Student');
});
app.get('/Sign-In', (req, res) => {
    res.render('Sign-In');
});
app.post("/Sign-Up", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            id: req.body.id,
            password: hashedPassword,
            email: req.body.email,
            Gender: req.body.Gender,
            Age: req.body.Age,
            Phone: req.body.Phone,
            Roll: req.body.Roll,
            Birthdate: req.body.Birthdate
        });

        const existingUser = await User.findOne({ FirstName: req.body.FirstName });

        if (existingUser) {
            console.log("User already exists!");
            return res.redirect("/Sign-Up");
        }

        if (!passwordSchema.validate(req.body.password)) {
            console.log("Password validation failed");
            return res.redirect("/Sign-Up");
        }

        await newUser.save();
        console.log("Sign up successful");
        return res.redirect('/Sign-In');

    } catch (err) {
        console.error('Error signing up:', err);
        return res.redirect('/Sign-Up');
    }
});

app.post("/Sign-Up-Student", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            id: req.body.id,
            password: hashedPassword,
            email: req.body.email,
            Gender: req.body.Gender,
            Age: req.body.Age,
            Phone: req.body.Phone,
            Roll: req.body.Roll,
            Birthdate: req.body.Birthdate
        });

        const existingUser = await User.findOne({ FirstName: req.body.FirstName });

        if (existingUser) {
            console.log("User already exists!");
            return res.redirect("/Sign-Up-Student");
        }

        if (!passwordSchema.validate(req.body.password)) {
            console.log("Password validation failed");
            return res.redirect("/Sign-Up-Student");
        }

        await newUser.save();
        console.log("Sign up successful");
        return res.redirect('/Sign-Up-Student');

    } catch (err) {
        console.error('Error signing up:', err);
        return res.redirect('/Sign-Up-Student');
    }
});

app.post('/Sign-In', async(req, res) => {
    try {
        const { password, FirstName } = req.body;

        const user = await User.findOne({ FirstName }).exec();

        if (user && await bcrypt.compare(password, user.password)) {
            if (user.Roll === "Student") {
                res.cookie('user', JSON.stringify(user), { httpOnly: true });
                console.log("Sign in successful");
                return res.redirect('/Student-Profile');
            }
            if (user.Roll === "Freelancer") {
                res.cookie('user', JSON.stringify(user), { httpOnly: true });
                console.log("Sign in successful");
                return res.redirect('/Freelancer-Profile');
            }
            if (user.Roll === "Admin") {
                res.cookie('user', JSON.stringify(user), { httpOnly: true });
                console.log("Sign in successful");
                return res.redirect('/Admin-Profile');
            }
        } else {
            console.log("Invalid credentials");
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).redirect('/Sign-In');
    }
});




module.exports = app;