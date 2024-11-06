const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  user: Object,
});

module.exports = mongoose.model("History", HistorySchema);
