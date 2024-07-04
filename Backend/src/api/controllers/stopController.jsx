const Stop = require('../models/stopModel.jsx');

const getStops = async (req, res) => {
  try {
    const stops = await Stop.find().populate('schedule');
    res.status(200).json(stops);
  } catch (error) {
    console.error('Failed to fetch stops:', error);
    res.status(500).json({ error: 'Failed to fetch stops' });
  }
};

const createStop = async (req, res) => {
  const stopData = req.body;
  try {
    const newStop = new Stop(stopData);
    await newStop.save();
    res.status(201).json(newStop);
  } catch (error) {
    console.error('Failed to create stop:', error);
    res.status(500).json({ error: 'Failed to create stop' });
  }
};

module.exports = { getStops, createStop };
