const fs = require("fs");

class Student {
  getAll() {
    return JSON.parse(fs.readFileSync("Data.json"));
  }

  getById(id) {
    return this.getAll().find(s => s.id === id);
  }

  create(data) {
    const students = this.getAll();
    const newStudent = { id: students.length + 1, ...data };
    students.push(newStudent);
    fs.writeFileSync("Data.json", JSON.stringify(students));
    return newStudent;
  }

  update(id, data) {
    const students = this.getAll();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    students[index] = { ...students[index], ...data };
    fs.writeFileSync("Data.json", JSON.stringify(students));
    return students[index];
  }

  delete(id) {
    const students = this.getAll();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return false;
    students.splice(index, 1);
    fs.writeFileSync("Data.json", JSON.stringify(students));
    return true;
  }
}    

module.exports = Student;