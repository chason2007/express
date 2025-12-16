const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use("/api/v3/students", studentRoutes);

module.exports = app;