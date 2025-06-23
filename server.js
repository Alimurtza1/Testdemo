const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const app = express();

const User = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://localhost:27017/Oms')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/',(req,res) => {
    res.render('login')
});

app.post('/edit/:id', async (req, res) => {
    try {
        const user = await Data.findById(req.params.id);

        // if (user) {
        //     user.categoryName = req.body.categoryName;
        //     if (req.file) {
        //         user.categoryImage = `uploads/${req.file.filename}`;
        //     }
        //     await user.save();
        //     res.redirect('/dashboard');
        // } else {
        //     res.status(404).send('User not found');
        // }

        res.redirect('/dashboard');
     } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user details');
    }
});

app.post('/dashboard', async (req, res) => {
    try {
        // Fetch users from the database
        const users = await User.find();  // Query for users
        console.log(users);  // Check if users are being returned
        res.render('dashboard', { users });  // Pass the users array to the dashboard view
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

         console.log(user);
         
        res.redirect('/dashboard');
    } catch (e) {
        console.error('Login Error:', e.message);  // Log the error message
        res.status(500).send('Internal Server Error');
    }
});


// app.post('/Signup', async (req, res) => {
//     const { fullname, email, password } = req.body;
//     try {
//         // Check if the user already exists by fullname and email
//         const userExists = await User.findOne({ fullname, email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // If user does not exist, create a new user (you should hash the password first in a real app)
//         const newUser = new User({ fullname, email, });
//         await newUser.save();  // Save the user in the database
        
//         return res.status(201).json({ message: 'User created successfully' });
//     } catch (e) {
//         console.error(e);
//         res.status('Error creating user') ;
//     }
// });

app.listen(100, () => {
    console.log('Server running on port 100');
});