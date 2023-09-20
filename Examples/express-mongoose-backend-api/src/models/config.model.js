const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

 const Config = mongoose.model('Config', configSchema);

 module.exports = Config;