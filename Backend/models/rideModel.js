const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  captain:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup:{
    type: String,
    required: true
  },
  destination:{
    type: String,
    required: true
  },
  fare:{
    type: String,
    required: true
  },
  status:{
    type: String,
    enum: ["pending", "accepted", "cancelled", "completed","ongoing"],
    default: "pending"
  },
  duration:{
    type:Number,
  },
  distance:{
    type:Number
  },
  paymentID:{
    type:String,
  },
  orderId:{
    type:String
  },
  signature:{
    type:String
  },

})



module.exports = mongoose.model("ride",rideSchema);