const captainModel = require("../models/captainModel");


exports.createCaptain = async({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType
  })=>
  {
  if(!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType){
    // console.log("these are not coming or not",firstName,lastName,email,password,color,plate,capacity,vehicleType);
    throw new Error("All fields are required");
  }
    const captain = await captainModel.create({
      fullname:{firstName,lastName},
      email,
      password,
      vehicle:{color,plate,capacity,vehicleType}
    });

      return captain;

  };

  