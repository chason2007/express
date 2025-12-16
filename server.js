const app = require("./index.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

mongoose
.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log("Error connecting to database", err);
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});