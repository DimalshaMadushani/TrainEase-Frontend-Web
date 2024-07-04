const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.jsx');
const scheduleRoutes = require('./routes/schedulesRoutes.jsx');
const stationRoutes = require('./routes/stationRoutes.jsx');
const stopRoutes = require('./routes/stopRoutes.jsx');

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

//user Routes
app.use('/profile', userRoutes);

// Schedule Routes
app.use('/api', scheduleRoutes);
app.use('/api', stopRoutes);
app.use('/api', stationRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});