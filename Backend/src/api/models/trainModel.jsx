const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  trainId: String,
  name: String,
  type: String,
  // add other necessary fields
});

module.exports = mongoose.model('Train', TrainSchema);
