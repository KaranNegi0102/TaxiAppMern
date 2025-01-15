const captainModel = require("../models/captainModel");
const {createCaptain} = require("../services/captainService");
const {validationResult} = require("express-validator");
const blackListTokenModel = require("../models/blackListTokenModel");

exports.registerCaptain = async(req,res,next)=>{
  const error = validationResult(req); //basically this checks the values jo arhe h routes se 
  // console.log("this is error",error);
  if(!error.isEmpty()){
    return res.status(400).json({errors: error.array()});
  }
    
  // console.log("this is req.body",req.body);
  const {fullname,email,password,vehicle} = req.body;

  const isCaptainExist = await captainModel.findOne({email});

  if(isCaptainExist){
    return res.status(400).json({message: "Captain already exists"});
  }


  const hashedPassword = await captainModel.hashPassword(password);

  try{
    const newCaptain = await createCaptain(
    {firstName:fullname.firstName,
      lastName:fullname.lastName,
      email,
      password:hashedPassword,
      color:vehicle.color,
      plate:vehicle.plate,
      capacity:vehicle.capacity,
      vehicleType:vehicle.vehicleType
    });

    const token = newCaptain.generateAuthToken();

    res.status(200).json({message: "Captain registered successfully",token,newCaptain});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
}

exports.loginCaptain = async(req,res,next)=>{

  const error = validationResult(req); //basically this checks the values jo arhe h routes se 
  // console.log("this is error",error);
  if(!error.isEmpty()){
    return res.status(400).json({errors: error.array()});
  }

  const {email,password} = req.body;

  try{
    const existingCaptain = await captainModel.findOne({email}).select("+password");

    if(!existingCaptain){
      return res.status(401).json({message: "Invalid email or password"});
  }

    const checkPassword = await existingCaptain.comparePassword(password);
    if(!checkPassword){
      return res.status(401).json({message: "Invalid password"});
    }

    const token = existingCaptain.generateAuthToken();
    console.log(token,existingCaptain);
    res.cookie("token",token,{httpOnly: true}).status(200).json({message: "Captain logged in successfully",token,existingCaptain});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "Internal server error"});
  }
}

exports.getProfile = async(req,res,next)=>{
  res.status(200).json(req.user);
}

exports.logoutCaptain = async(req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({token});

  res.clearCookie("token").status(200).json({message: "Captain logged out successfully"});
}


