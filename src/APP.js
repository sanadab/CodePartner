const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const passwordValidator = require("password-validator");
const User = require('./Database/User.js').User;
const api = require('./Database/api.js').api;
const req1 = require('./Database/sreq.js').reqs;
const req2 = require('./Database/freq.js').req2;
const contact = require('./Database/cont.js').contact;
const feed = require('./Database/feedback.js').feed;

const cookieParser = require("cookie-parser");
const request = require('supertest');
const { setCookie, readCookie, editCookie, deleteCookie } = require("../cookies.js");
// import express from 'express';
// import path from 'path';
const app = express();
const saltRounds = 10;
app.use(bodyParser.json());


// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service
    auth: {
        user: 'sanadabed92@gmail.com',
        pass: 'Sanadab77@'
    }
});

// Send message endpoint
app.post('/send-message', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: 'sanadabed92@gmail.com',
        to: email,
        subject: 'New Message from Code Partner',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).json({ success: false });
        }
        console.log('Email sent:', info.response);
        res.json({ success: true });
    });
});

app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

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
app.get('/get-api-key', (req, res) => {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
        res.json({ apiKey });
    } else {
        res.status(404).json({ error: 'API key not found' });
    }
});
app.get('/api', async(req, res) => {
    try {
        const users = await api.find({});
        res.render('api', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving users");
    }
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

app.get('/AI-ins2', (req, res) => {
    res.render('AI-ins2');
});

app.get('/HomePage', (req, res) => {
    res.render('HomePage');
});
app.get('/ForgotPW', (req, res) => {
    res.render('ForgotPW');
});
app.get('/Sign-Up', (req, res) => {
    res.render('Sign-Up');
});
app.get('/feedback', (req, res) => {
    res.render('feedback');
});
app.get('/Sign-Up-Student', (req, res) => {
    res.render('Sign-Up-Student');
});
app.get('/Sign-In', (req, res) => {
    res.render('Sign-In');
});
app.get('/Sign-In2', (req, res) => {
    res.render('Sign-In');
});
app.get('/HomePage1', (req, res) => {
    res.render('HomePage1');
});
app.get('/HomePage2', (req, res) => {
    res.render('HomePage2');
});
app.get('/HomePage3', (req, res) => {
    res.render('HomePage3');
});
app.get('/AI-ins', (req, res) => {
    res.render('AI-ins');
});
app.get('/feedback2', (req, res) => {
    res.render('feedback2');
});




app.post("/feedback2", async(req, res) => {




    const newUser1 = new feed({
        feedback: req.body.feedback

    });

    await newUser1.save();

    console.log("Data saved successfully:");


    return res.redirect('/feedback2');


});



app.get('/Student-Profile', async(req, res) => {
    const user = isStudent(req, res);
    const apiDoc = await api.findOne({});
    const api1 = apiDoc.api_key;

    if (user) {
        const x = user.FirstName;
        res.render('Student-Profile', { api1, x });

    }


});
app.post('/HomePage', async(req, res) => {
    try {
        console.log("Form submission received:", req.body);

        const newContact = new contact({
            Name: req.body.Name,
            Message: req.body.Message,
            Email: req.body.Email,
        });

        await newContact.save();

        console.log("Data saved successfully:", newContact);
        return res.redirect('/HomePage');

    } catch (err) {
        console.error("Error saving data:", err);
        return res.status(500).send("Internal Server Error");
    }
});
app.get('/Freelancer-Profile', async(req, res) => {
    const user = isFreelanser(req, res);
    const apiDoc = await api.findOne({});
    const api1 = apiDoc.api_key;

    if (user) {
        res.render('Freelancer-Profile', { api1 });
    }
});
app.get('/Admin-Profile', (req, res) => {
    const user = isAdmin(req, res);
    if (user) {
        res.render('Admin-Profile');
    }
});
app.get('/View-Users', async(req, res) => {
    try {
        const users = await User.find({});
        res.render('View-Users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving users");
    }
});
app.get('/learning', (req, res) => {
    res.render('learning');
});
app.get('/add-req', (req, res) => {
    res.render('add-req');
});
app.get('/add-req2', (req, res) => {
    res.render('add-req2');
});
app.get('/view-project2', async(req, res) => {
    try {
        const userCookie = req.cookies.user;
        let users = [];

        if (userCookie) {
            const user = JSON.parse(userCookie);
            // Fetch projects associated with the logged-in user
            users = await req2.find({ userId: user._id });
        } else {
            users = await req2.find({});
        }

        res.render('view-project2', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving projects");
    }
});
app.delete('/delete-message/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await contact.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.json({ success: false });
    }
});
app.delete('/delete-message4/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.json({ success: false });
    }
});
app.delete('/delete-message10/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await feed.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.json({ success: false });
    }
});
app.get('/view-project', async(req, res) => {
    try {
        const userCookie = req.cookies.user;
        let users = [];

        if (userCookie) {
            const user = JSON.parse(userCookie);
            // Fetch projects associated with the logged-in user
            users = await req1.find({ userId: user._id });
        } else {
            users = await req1.find({});
        }

        res.render('view-project', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving projects");    
    }
});
app.post("/feedback", async(req, res) => {




    const newUser1 = new feed({
        feedback: req.body.feedback

    });

    await newUser1.save();

    console.log("Data saved successfully:");


    return res.redirect('/feedback');


});

app.post("/add-req2", async(req, res) => {
    try {
        const userCookie = req.cookies.user;

        if (!userCookie) {
            console.log("User not logged in");
            return res.redirect('/Sign-In'); // Redirect to sign-in if no user cookie
        }

        const user = JSON.parse(userCookie);

        const newUser1 = new req2({
            Projectname2: req.body.Projectname2,
            Issue2: req.body.Issue2,
            Description2: req.body.Description2,
            Childissue2: req.body.Childissue2,
            Priorety2: req.body.Priorety2,
            userId: user._id // Associate the request with the user ID
        });

        await newUser1.save();

        console.log("Data saved successfully:");
        console.log(newUser1);

        return res.redirect('/add-req2');

    } catch (err) {
        console.error("Error saving data:", err);
        return res.status(500).send("Internal Server Error");
    }
});
app.post("/add-req", async(req, res) => {
    try {
        const userCookie = req.cookies.user;

        if (!userCookie) {
            console.log("User not logged in");
            return res.redirect('/Sign-In'); // Redirect to sign-in if no user cookie
        }

        const user = JSON.parse(userCookie);

        const newUser1 = new req1({
            Projectname: req.body.Projectname,
            Issue: req.body.Issue,
            Description: req.body.Description,
            Childissue: req.body.Childissue,
            Priorety: req.body.Priorety,
            userId: user._id // Associate the request with the user ID
        });

        await newUser1.save();

        console.log("Data saved successfully:");
        console.log(newUser1);

        return res.redirect('/add-req');

    } catch (err) {
        console.error("Error saving data:", err);
        return res.status(500).send("Internal Server Error");
    }
});


function isFreelanser(req, res) {
    const user = readCookie(req, "user");
    if (!user) {
        res.redirect("Sign-In");
        return null;
    }
    return user;
}

function isAdmin(req, res) {
    const user = readCookie(req, "user");
    if (!user) {
        res.redirect("Sign-In");
        return null;
    }
    return user;
}

function isStudent(req, res) {
    const user = readCookie(req, "user");
    if (!user) {
        res.redirect("Sign-In");
        return null;
    }
    return user;
}

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

app.post('/ForgotPW', async(req, res) => {
    try {
        const { id, email, newpass, confnewpass } = req.body;

        if (newpass !== confnewpass) {
            console.log("Passwords do not match");
            return res.redirect("/ForgotPW");
        }

        const user = await User.findOne({ id, email });

        if (!user) {
            console.log("User doesn't exist");
            return res.redirect("/ForgotPW");
        }

        const hashedPassword = await bcrypt.hash(newpass, saltRounds);
        await User.updateOne({ id: user.id }, { password: hashedPassword });

        console.log("Password changed successfully");
        return res.redirect("/Sign-In");
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ error: err.message });
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

app.post("/api", async(req, res) => {

    const newUser = new api({
        api_key: req.body.api_key,

    });

    await newUser.save();

    return res.redirect("/api");

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


app.get('/logout', (req, res) => {
    res.clearCookie('user'); // Clear the user cookie
    res.redirect('/Sign-In'); // Redirect to the sign-in page
});


module.exports = app;