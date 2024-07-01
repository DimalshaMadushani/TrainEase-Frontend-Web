const User = require('../models/userModel');

const getUserProfile = async (req, res) => {
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
};

const updateUserProfile = async (req, res) => {
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
};

const addNewUserProfile = async (req, res) => {
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
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    addNewUserProfile,
};
