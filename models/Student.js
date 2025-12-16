const fs = require("fs");

class Student {
  constructor() {
    this.dataPath = "Data.json";
  }

  getAll() {
    return JSON.parse(fs.readFileSync(this.dataPath));
  }

  getById(id) {
    const students = this.getAll();
    return students.find(student => student.id === id);
  }

  create(studentData) {
    const students = this.getAll();
    const newStudent = { id: students.length + 1, ...studentData };
    students.push(newStudent);
    fs.writeFileSync(this.dataPath, JSON.stringify(students, null, 2));
    return newStudent;
  }

  update(id, studentData) {
    const students = this.getAll();
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return null;
    
    students[index] = { ...students[index], ...studentData };
    fs.writeFileSync(this.dataPath, JSON.stringify(students, null, 2));
    return students[index];
  }

  delete(id) {
    const students = this.getAll();
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return false;
    
    students.splice(index, 1);
    fs.writeFileSync(this.dataPath, JSON.stringify(students, null, 2));
    return true;
  }
}

module.exports = Student;