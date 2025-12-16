const Student = require("../models/studentModel");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      status: "Success",
      length: students.length,
      timeOfHit: req.requestTimeOfHit,
      msg: req.message,
      data: {
        students,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      status: "Failed",
      msg: error.message,
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      timeOfHit: req.requestTimeOfHit,
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error",
      status: "Failed",
      msg: error.message,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: "Not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};