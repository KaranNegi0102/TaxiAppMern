const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  fullname:{
    firstName:{
      type: String,
      required: true,
      minlength:[3,"Name should be at least 3 characters long"]
    },
    lastName:{
      type: String,
      required: true,
      minlength:[3,"Name should be at least 3 characters long"]
    }
  },
  email:{
    type: String,
    required: true,
    unique: true,
    minlength:[5,"Email should be at least 3 characters long"]
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  socketId:{
    type: String
  }
})

UserSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn:"24h"})
  return token;
}

UserSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

UserSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password,10);
}

const UserModel = mongoose.model("user",UserSchema);
module.exports = UserModel;


