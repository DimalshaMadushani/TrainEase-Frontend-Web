const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model('Station', StationSchema);
