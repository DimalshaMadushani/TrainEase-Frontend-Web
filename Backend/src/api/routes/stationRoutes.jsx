const express = require('express');
const { getStations, createStation } = require('../controllers/stationController.jsx');

const router = express.Router();

router.get('/stations', getStations);
router.post('/stations', createStation);

module.exports = router;
