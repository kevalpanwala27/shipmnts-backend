const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  recipient: String,
  subject: String,
  body: String,
  scheduleTime: Date,
  recurrence: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    default: null,
  },
  attachments: [String],
});

module.exports = mongoose.model("ScheduledEmail", emailSchema);
