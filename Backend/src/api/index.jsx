const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/profiledb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Define schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    bookingHistory: [{
        name: { type: String, required: true },
        date: { type: String, required: true },
        passengers: { type: Number, required: true },
        amount: { type: String, required: true }
    }]
});

const User = mongoose.model('User', userSchema);


// Root endpoint
app.get('/', (req, res) => {
    res.send('TrainEase Backend Server is running.');
});

// Get user profile by username
app.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile
app.put('/profile/:username', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
            req.body,
            { new: true }
        );
        if (updatedUser) {
            res.json({ message: 'User profile updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new user profile
app.post('/profile', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        if (err.code === 11000) {
            console.error('Duplicate key error:', err);
            res.status(400).json({ error: 'Username or email already exists' });
        } else {
            console.error('Error adding new user profile:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});