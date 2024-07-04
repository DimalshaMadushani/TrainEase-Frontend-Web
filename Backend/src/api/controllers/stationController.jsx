const Station = require('../models/stationsModel.jsx');

const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
};

const createStation = async (req, res) => {
  const stationData = req.body;
  try {
    const newStation = new Station(stationData);
    await newStation.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create station' });
  }
};

module.exports = { getStations, createStation };
