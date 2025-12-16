const { default: mongoose } = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
})

const Student = mongoose.model("Student", StudentSchema);
exports.module = Student;