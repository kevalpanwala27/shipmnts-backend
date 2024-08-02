const ScheduledEmail = require("../models/ScheduledEmail");
const emailService = require("../services/emailService");

exports.scheduleEmail = async (req, res) => {
  const { recipient, subject, body, scheduleTime, recurrence, attachments } =
    req.body;
  const email = new ScheduledEmail({
    recipient,
    subject,
    body,
    scheduleTime,
    recurrence,
    attachments,
  });
  await email.save();
  emailService.scheduleEmail(email);
  res.status(201).send(email);
};

exports.getScheduledEmails = async (req, res) => {
  const emails = await ScheduledEmail.find();
  res.send(emails);
};

exports.getScheduledEmailById = async (req, res) => {
  const email = await ScheduledEmail.findById(req.params.id);
  if (!email) return res.status(404).send("Email not found");
  res.send(email);
};

exports.deleteScheduledEmail = async (req, res) => {
  const email = await ScheduledEmail.findByIdAndDelete(req.params.id);
  if (!email) return res.status(404).send("Email not found");
  res.send(email);
};
