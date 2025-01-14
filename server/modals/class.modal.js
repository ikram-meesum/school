const mongoose = require("mongoose");

let classSchema = new mongoose.Schema(
  {
    classname: { type: String, require: true },
    // class_name: { type: mongoose.Schema.Types.ObjectId, ref: "classname" },
  },
  { timestamps: true }
);

let Classes = mongoose.model("classname", classSchema);
module.exports = Classes;
