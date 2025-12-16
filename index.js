const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());

app.use("/api/v3/students", studentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});