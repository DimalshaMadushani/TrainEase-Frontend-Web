const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
