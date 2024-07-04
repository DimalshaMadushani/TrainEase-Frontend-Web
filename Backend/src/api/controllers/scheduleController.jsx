const Schedule = require('../models/scheduleModel.jsx');
const Train = require('../models/trainModel.jsx');

const getSchedules = async (req, res) => {
  const { from, to, date } = req.query;
  try {
    const schedules = await Schedule.find({ from, to, date }).populate('train');
    res.status(200).json(schedules);
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
};

const createSchedule = async (req, res) => {
  const scheduleData = req.body;
  try {
    const newSchedule = new Schedule(scheduleData);
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Failed to create schedule:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
};

module.exports = { getSchedules, createSchedule };
