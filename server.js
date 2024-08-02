const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./databases/connectDB.js");
const emailRoute = require("./routes/emailRoute.js");
const emailService = require("./services/emailService.js");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());

// Connecting to Database
connectDB();

// Routes
app.use("/api", emailRoute);

app.get("/", (req, res) => {
  res.send("Designing an automated Email scheduling API");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  emailService.initializeScheduledEmails();
});
