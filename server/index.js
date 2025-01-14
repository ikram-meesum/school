const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./config");
connectDB();

let port = process.env.PORT || 5000;

app.use("/student", require("./routes/student.routes"));
app.use("/fee", require("./routes/fee.routes"));
// app.use("/detail", require("./routes/detail.route"));

app.listen(port, () => console.log(`server is running on port ${port}`));
