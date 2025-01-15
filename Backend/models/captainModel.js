const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlength:[3,"Name should be at least 3 characters long"]
    },
    lastName: {
      type: String,
      required: true,
      minlength:[3,"Name should be at least 3 characters long"]
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength:[5,"Email should be at least 3 characters long"]
  },
  password: {
    type: String,
    required: true
  },
  socketId: {
    type: String,
  },

  status:{
    type: String,
    default: "inactive",
    enum:["active","inactive"]

  },
  
  vehicle:{
    color:{
      type: String,
      required: true,
      minlength:[3,"color should be at least 3 characters long"]
    },
    plate:{
      type: String,
      required: true,
      minlength:[3,"plate should be at least 3 characters long"]
    },
    capacity:{
      type: Number,
      required: true,
      min:[1,"capacity should be at least 1 person"]
    },
    vehicleType:{
      type: String,
      required: true,
      enum:["Car","Auto","Bike"]
    }
  },

  location:{
    lng:{
      type: Number,
    },
    lat:{
      type: Number,
    }
  }
});


captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  })
  return token; 
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
} 

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;

