const mongoose = require("mongoose");

const conversacionRequest = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  discordId: {
    type: String,
    required: true,
  },
  messages: [
    {
      role: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  requestType: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ConversacionRequest = mongoose.model(
  "conversacionRequest",
  conversacionRequest
);
module.exports = ConversacionRequest;
