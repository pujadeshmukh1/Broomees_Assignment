const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true
}));

mongoose.connect('mongodb://localhost:27017/signup');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const saltRounds = 10;

app.post('/signup', async (req, res) => {
    const { firstname, lastname, email, username, password, confirmpassword } = req.body;

    // if (!firstname || !lastname || !email || !username || !password || !confirmpassword) {
    //     return res.status(400).json({ error: 'Please fill in all required fields' });
    // }

    // if (password !== confirmpassword) {
    //     return res.status(400).json({ error: 'Passwords do not match' });
    // }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists. Please enter a new email.' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ firstname, lastname, email, username, password: hashedPassword });
        await newUser.save();
        // Send back the user object without the password
        const userWithoutPassword = { ...newUser._doc };
        delete userWithoutPassword.password;
        res.json({ status: 'Success', user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});




app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'jwt-secret-key', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ status: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/', (req, res) => {
    // Check the authentication status here and return the appropriate response
    // For example, you can check if the user is logged in and return a success status
    // or return an error status if the user is not logged in
    res.json({ status: 'Success', email: 'user@example.com' });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ status: 'Success' });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
