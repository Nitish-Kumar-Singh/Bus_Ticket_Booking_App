const mongoose = require('mongoose');
const BusSchema = new mongoose.Schema({
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  busType: {
    type: String,
    require: true,
  },
  arrdate: {
    type: String,
    require: true,
  },
  seat: {
    type: Number,
    require: true,
  },
  fare: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Bus = mongoose.model('bus', BusSchema);
