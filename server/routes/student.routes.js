let express = require("express");
let route = express.Router();

let Student = require("../modals/student.modal");

route.get("/", async (req, res) => {
  try {
    const doc = await Student.find(
      {
        present: "YES",
      },
      null,
      { sort: { _id: -1 } }
    );
    //   .populate("teacher_id", "teacher")
    //   .sort({ _id: -1 })
    //   .exec();
    // console.log(doc);
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get teacher", err);
  }
});

route.get("/:id", async (req, res) => {
  const sid = req.params.id;
  try {
    const doc = await Student.findOne({ _id: sid });
    // .populate("teacher_id", "teacher")
    // .exec();
    res.json(doc);
  } catch (err) {
    console.log("Error occured from get student id wise: ", err);
  }
});

// route.get("/total/:id", async (req, res) => {
//   const tid = req.params.id;
//   try {
//     const doc = await Student.find({ teacher_id: tid }).exec();
//     // console.log(doc);
//     res.json(doc);
//   } catch (err) {
//     console.log("Error occured from get teacher", err);
//   }
// });

route.post("/", async (req, res) => {
  // console.log("INSERTED");

  const studentData = new Student({
    sname: req.body.sname,
    fname: req.body.fname,
    mobile: req.body.mobile,
    // email: req.body.email,
    address: req.body.address,
    dob: req.body.dob,
    doj: req.body.doj,
    dor: req.body.dor,
    class_name: req.body.class_name,
    rollno: req.body.rollno,
  });

  console.log("server: ", studentData);

  try {
    const result = await studentData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert student data: ", err);
  }
});

route.put("/:id", async (req, res) => {
  let studentid = req.params.id.toString();
  console.log(studentid);

  let doc = await Student.findOneAndUpdate(
    { _id: studentid },
    {
      sname: req.body.sname,
      fname: req.body.fname,
      mobile: req.body.mobile,
      address: req.body.address,
      dob: req.body.dob,
      doj: req.body.doj,
      dor: req.body.dor,
      class_name: req.body.class_name,
      rollno: req.body.rollno,
      present: req.body.present,
    },
    { useFindAndModify: false }
  );
  //doc.name; // 'Jean-Luc Picard'
  //doc.age; // undefined

  doc = await Student.findOne({ _id: studentid });
  console.log("UPDATE RECORD: ", doc);
});

module.exports = route;
