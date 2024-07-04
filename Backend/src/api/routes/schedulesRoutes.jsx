const express = require('express');
const { getSchedules, createSchedule } = require('../controllers/scheduleController.jsx');

const router = express.Router();

router.get('/schedules', getSchedules);
router.post('/schedules', createSchedule);

module.exports = router;
