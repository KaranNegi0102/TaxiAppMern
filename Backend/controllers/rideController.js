const rideService = require("../services/rideService");
const {validationResult} = require("express-validator");
const maps = require("../services/maps.sevice");
const {sendMessageToSocketId} = require("../socket");
// const {query} = require("express-validator");
module.exports.createRide = async(req,res)=>{

  const errors = validationResult(req);

  // console.log(query('pickup').isString().isLength({min:3}).withMessage("Origin is required"));

  if(!errors.isEmpty()){
    // console.log("yaha par error h yaar --> createRide controller error validation ");
    return res.status(400).json({errors: errors.array()});
  }

  const {pickup,destination,vehicleType} = req.query;
  // console.log("this is req.body ->> ",req.query);
  const user = req.user._id;
  // console.log("this is userID ->> ",user);

  try{
    const ride = await rideService.createRide({user,pickup,destination,vehicleType});
    // console.log("this is ride 2 -> ",ride);
    res.status(200).json(ride);

    const pickupCoordinates = await maps.getAddressCoordinates(pickup);
    console.log("pickup ke coordinates -> ",pickupCoordinates.ltd,pickupCoordinates.lng);
     
    const captainsInRadius = await maps.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
    console.log(captainsInRadius);

    ride.otp = " "

    captainsInRadius.map(async (captain) => {
      console.log("this is captain and ride -> ",captain,ride);
      sendMessageToSocketId(captain.socketId, {event: "new-ride", data: ride});
    })


  }catch(err){
    console.log("kya yaha par h error --> ride controller" , err);
    // res.status(500).json({error: err.message});
    
  }


}

module.exports.getFare = async(req,res)=>{
  
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // console.log("yaha par error h yaar ");
    return res.status(400).json({errors: errors.array()});
  }
  
  const {pickup,destination} = req.query;

  try{

    const fare = await rideService.getFare(pickup,destination);
    res.status(200).json(fare);
    // console.log("this is fare that it will give us -> ",fare);

  }catch(err){
    // console.log("kya yaha par h error?? ");
    res.status(500).json({error: err.message});
  }

}