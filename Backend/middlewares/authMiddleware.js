const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captainModel");
const blackListTokenModel = require("../models/blackListTokenModel");

exports.authUser = async(req,res,next)=>{
  // console.log("this is req.cookies > ",req.cookies)
  // console.log("this is req.headers > ",req.headers.authorization)

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if(!token) return res.status(401).json({message: "Unauthorized"});

  const isBlackListed = await blackListTokenModel.findOne({token:token})

  if(isBlackListed) return res.status(401).json({message: "Unauthorized"});

  try{
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const user=await UserModel.findById(decode._id);
    // console.log("this is user >",user)
    req.user=user;
    // console.log("this is req.user > ",req.user)
    next();

  }catch(err){
    return res.status(401).json({message: "Unauthorized"});
  }
  
}

exports.authCaptain = async(req,res,next)=>{
  console.log("this is req.cookies > ",req.cookies);
  console.log("this is req.headers > ",req.headers.authorization);

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if(!token) return res.status(401).json({message: "Unauthorized"});

  const isBlackListed = await blackListTokenModel.findOne({token:token})

  if(isBlackListed) return res.status(401).json({message: "Unauthorized"});

  try{
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const captain=await captainModel.findById(decode._id);
    // console.log("this is user >",user)
    req.user=captain;
    // console.log("this is req.captain > ",req.user);
    // console.log("this is req.user > ",req.user)
    next();

  }catch(err){  
    return res.status(401).json({message: "Unauthorized"});
  }
}