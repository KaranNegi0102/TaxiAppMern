const UserModel = require("../models/userModel");
const {createUser} = require("../services/UserService");
const {validationResult} = require("express-validator"); 
const blackListTokenModel = require("../models/blackListTokenModel");
exports.registerUser = async (req,res,next)=>{

  const error = validationResult(req); //basically this checks the values jo arhe h routes se 
  // console.log("this is error",error);
  if(!error.isEmpty()){
    return res.status(400).json({errors: error.array()}); 
  }

  const {fullname,email,password} = req.body;
  // console.log("line 14 - > ",fullname,email,password);

  const existingUser = await UserModel.findOne({email});

  if(existingUser){
    return res.status(400).json({message: "User already exists"});
  }

  try{
    const hashedPassword = await UserModel.hashPassword(password);
    
    // const newUser = await UserModel.create({
    //   fullname:{
    //     firstName:fullname.firstName,
    //     lastName:fullname.lastName
    //   },
    //   email,
    //   password:hashedPassword
    // })

    // console.log("checking data before creatUser - >",fullname.firstName,fullname.lastName,email,password);

    const newUser = await createUser({
    
      firstName:fullname.firstName,
      lastName:fullname.lastName, 
      email,
      password:hashedPassword
    })
    // console.log("line 42 create user->",newUser);

    const token = newUser.generateAuthToken();
    console.log(token,newUser);
    res.status(200).json({message: "User created successfully",token,newUser});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
    
  }


}

exports.loginUser = async(req,res,next)=>{

  const error = validationResult(req); //basically this checks the values jo arhe h routes se 
  // console.log("this is error",error);
  if(!error.isEmpty()){
    return res.status(400).json({errors: error.array()}); 
  }

  const {email,password} = req.body;

  try{
    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
      return res.status(401).json({message: "Invalid email or password"});
    }

    const checkPassword = await user.comparePassword(password);
    if(!checkPassword){
      return res.status(401).json({message: "Invalid password"});
    }

    const token = user.generateAuthToken();
    console.log(token,user);


    res.cookie("token",token,{httpOnly: true}).status(200).json({message: "User logged in successfully",token,user});

  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
}

exports. getProfile = async(req,res,next)=>{
  res.status(200).json(req.user);
}

exports.logoutUser = async(req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blackListTokenModel.create({token});

  res.clearCookie("token").status(200).json({message: "User logged out successfully"});
}
