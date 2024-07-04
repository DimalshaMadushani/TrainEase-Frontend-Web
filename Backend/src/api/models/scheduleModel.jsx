const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  id: String,
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  monday: Boolean,
  tuesday: Boolean,
  wednesday: Boolean,
  thursday: Boolean,
  friday: Boolean,
  saturday: Boolean,
  sunday: Boolean,
  from: String,
  to: String,
  date: String,
  time: String,
  duration: String,
  type: String,
  price: String,
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
