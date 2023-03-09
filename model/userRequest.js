const mongoose = require('mongoose');

const userRequestSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserRequest = mongoose.model('usersRequest', userRequestSchema);
module.exports = UserRequest;