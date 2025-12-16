const Student = require("../models/Student");
const student = new Student();

exports.getAllStudents = (req, res) => {
  res.json(student.getAll());
};

exports.getStudentById = (req, res) => {
  const data = student.getById(req.params.id * 1);
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
};

exports.createStudent = (req, res) => {
  res.status(201).json(student.create(req.body));
};

exports.updateStudent = (req, res) => {
  const updated = student.update(req.params.id * 1, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
};

exports.deleteStudent = (req, res) => {
  if (!student.delete(req.params.id * 1)) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
};