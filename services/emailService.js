const cron = require("node-cron");
const ScheduledEmail = require("../models/ScheduledEmail.js");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const scheduleEmail = (email) => {
  const { scheduleTime, recurrence } = email;
  let cronTime;

  switch (recurrence) {
    case "daily":
      cronTime = "0 0 * * *"; // Every day at midnight
      break;
    case "weekly":
      cronTime = "0 0 * * 0"; // Every Sunday at midnight
      break;
    case "monthly":
      cronTime = "0 0 1 * *"; // First day of every month at midnight
      break;
    case "quarterly":
      cronTime = "0 0 1 */3 *"; // First day of every quarter at midnight
      break;
    default:
      cronTime = new Date(scheduleTime);
  }

  cron.schedule(cronTime, () => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.recipient,
      subject: email.subject,
      text: email.body,
      attachments: email.attachments.map((filePath) => ({ path: filePath })),
    });
  });
};

const initializeScheduledEmails = async () => {
  const emails = await ScheduledEmail.find();
  emails.forEach((email) => {
    scheduleEmail(email);
  });
};

module.exports = {
  scheduleEmail,
  initializeScheduledEmails,
};
