const mongoose = require("mongoose");

let feeSchema = new mongoose.Schema(
  {
    amount: { type: Number, require: true },
    monthof: { type: String, require: true },
    rcvd_date: { type: Date },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
  },
  { timestamps: true }
);

let Fee = mongoose.model("fee", feeSchema);
module.exports = Fee;
