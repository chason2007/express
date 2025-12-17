const express = require("express");
const app = express();
const studentRouter = require("./routes/studentRoutes");    
const authRouter = require("./routes/authRoutes");

app.use(express.json());
app.use("/api/v3/students", studentRouter);
app.use("/api/v3/auth", authRouter);

module.exports = app;