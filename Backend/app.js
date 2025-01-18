require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./connectionDb/connectDb");



connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get('/',(req,res)=>{
  res.send("Hello World");
})

app.use('/users',require("./routes/userRoutes"))
app.use('/captains',require("./routes/captainRoutes"))
app.use('/maps',require("./routes/mapsRoutes"))
app.use('/rides',require("./routes/ridesRoutes"))

module.exports = app;