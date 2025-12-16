const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use("/api/v3/students", studentRoutes);

app.listen(3000,() =>{
    console.log("Server started on port 3000");
})