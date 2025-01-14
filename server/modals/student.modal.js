const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema(
  {
    sname: { type: String, require: true },
    fname: { type: String, require: true },
    mobile: { type: String, require: true },
    address: { type: String, require: true },
    dob: { type: Date, require: true },
    doj: { type: Date, require: true },
    dor: { type: Date },
    rollno: { type: String, require: true },
    // class_name: { type: mongoose.Schema.Types.ObjectId, ref: "classname" },
    class_name: { type: String, require: true },
    present: { type: String, default: "YES" },
  },
  { timestamps: true }
);

let Student = mongoose.model("student", studentSchema);
module.exports = Student;
