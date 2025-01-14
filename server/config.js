const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGOURI);
    console.log(`Connected from mongodb database ${con.connection.host}`);
  } catch (err) {
    console.log(`Error from connected with database ${err}`);
    process.exit(1);
  }
};
module.exports = connectDB;
