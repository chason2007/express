const Student = require("../models/Student");
const student = new Student();

exports.getAllStudents = (req, res) => {
  const students = student.getAll();
  res.status(200).json({
    status: "Sucessful",
    length: students.length,
    data: { jsonData: students }
  });
};

exports.getStudentById = (req, res) => {
  const id = req.params.id * 1;
  const data = student.getById(id);

  if (!data) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "Sucessful",
    data: { data }
  });
};

exports.createStudent = (req, res) => {
  const newStudent = student.create(req.body);
  res.status(201).json({
    status: "Sucessful",
    data: { jsonData: newStudent }
  });
};

exports.updateStudent = (req, res) => {
  const id = req.params.id * 1;
  const updatedStudent = student.update(id, req.body);

  if (!updatedStudent) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "Sucessful",
    data: { data: updatedStudent }
  });
};

exports.deleteStudent = (req, res) => {
  const id = req.params.id * 1;
  const deleted = student.delete(id);

  if (!deleted) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    });
  }

  res.status(204).json({
    status: "Sucessful",
    data: null
  });
};