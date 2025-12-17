const express = require("express");
const studentController = require("../controllers/studentController");

const studentRouter = express.Router();

studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getStudentById);
studentRouter.post("/", studentController.createStudent);
studentRouter.put("/:id", studentController.updateStudent);
studentRouter.patch("/:id", studentController.updateStudent);
studentRouter.delete("/:id", studentController.deleteStudent);

module.exports = studentRouter;