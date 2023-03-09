const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  idDiscord: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  nivel: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const PromptClass = mongoose.model('promps', promptSchema);
module.exports = PromptClass;