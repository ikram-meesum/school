let express = require("express");
let route = express.Router();

const dayjs = require("dayjs");

let Student = require("../modals/student.modal");
let Fees = require("../modals/fee.modal");
// const Fee = require("../modals/fee.modal");

let dt = dayjs(new Date()).format("MMM-YYYY");
console.log("dt", dt);

route.get("/", async (req, res) => {
  const checkFee = await Fees.find({})
    .populate("studentId", ["sname", "fname", "rollno", "class_name"])
    .sort({ _id: -1 })
    .exec();
  console.log(checkFee);
  res.json(checkFee);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  const checkFee = await Fees.find({ studentId: id })
    .populate("studentId", ["sname", "fname", "rollno", "class_name"])
    .sort({ _id: -1 })
    .exec();
  console.log(checkFee);
  res.json(checkFee);
});

route.post("/", async (req, res) => {
  const doc = await Student.find({ present: "YES" });

  let studentData = null;
  let result = null;

  const feesCheck = await Fees.find({ monthof: dt });
  // console.log("fees check", feesCheck);

  if (feesCheck === undefined || feesCheck.length == 0) {
    console.log("NOT FEE FOUNT");

    for (i = 0; i < doc.length; i++) {
      studentData = new Fees({
        amount: 0,
        monthof: dt,
        rcvd_date: null,
        studentId: doc[i]._id,
      });
      result = await studentData.save();
    }
    res.json(result);
  } else {
    console.log("ALREADY GENERATED");
    res.send("ALREADY EXIST");
  }
});

route.put("/:id", async (req, res) => {
  let feeid = req.params.id.toString();
  console.log(feeid);

  // console.log("data:", fee);
  const date = new Date();

  let doc = await Fees.findOneAndUpdate(
    { _id: feeid },
    {
      amount: req.body.fee,
      rcvd_date: date,
    },
    { useFindAndModify: false }
  );
  //doc.name; // 'Jean-Luc Picard'
  //doc.age; // undefined

  doc = await Student.findOne({ _id: feeid });
  console.log("UPDATE FEE: ", doc);
});

module.exports = route;
