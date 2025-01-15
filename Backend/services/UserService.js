const UserModel = require("../models/userModel");

//iss function ka ek hi kaam h user create krna aur baki ke normal checkups krna
exports.createUser = async({
  firstName,lastName,email,password
})=>{
  // console.log("this is user service");
  // console.log("line 8 -> ",firstName,lastName,email,password);

  if(!firstName || !lastName || !email || !password){
    throw new Error("All fields are required");
  }
  const user = UserModel.create({
    fullname:{firstName,lastName},
    email,
    password
  })
  return user;
}