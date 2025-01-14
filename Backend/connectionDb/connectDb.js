const mongoose = require("mongoose");

const connectDb = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected successfully");
  }
  catch(err){
    console.log(err);
    console.log("error in connecting the database");
  }
}

module.exports = connectDb;