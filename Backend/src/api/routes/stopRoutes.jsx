const express = require('express');
const { getStops, createStop } = require('../controllers/stopController.jsx');

const router = express.Router();

router.get('/stops', getStops);
router.post('/stops', createStop);

module.exports = router;
