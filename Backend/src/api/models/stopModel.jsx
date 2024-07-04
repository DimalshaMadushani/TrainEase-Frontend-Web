const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
  id: String,
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },
  arrivalTime: String,
  departTime: String,
  stopNumber: Number,
  platformNumber: Number,
  price: String,
});

module.exports = mongoose.model('Stop', StopSchema);
