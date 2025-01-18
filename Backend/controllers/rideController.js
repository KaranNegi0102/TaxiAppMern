const rideService = require("../services/rideService");
const {validationResult} = require("express-validator");

module.exports.createRide = async(req,res)=>{

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log("yaha par error h yaar ");
    return res.status(400).json({errors: errors.array()});
  }

  const {pickup,destination,vehicleType} = req.body;
  console.log("this is req.body ->> ",req.body);
  const user = req.user._id;
  console.log("this is userID ->> ",user);

  try{
    const ride = await rideService.createRide({user,pickup,destination,vehicleType});
    console.log("this is ride 2 -> ",ride);
    res.status(200).json(ride);
    
  }catch(err){
    console.log("kya yaha par h error ");
    res.status(500).json({error: err.message});
  }


}