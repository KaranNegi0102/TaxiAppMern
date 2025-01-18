const rideModel = require("../models/rideModel");
const { getDistanceTime } = require("../services/maps.sevice");
const crypto = require("crypto");

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination || !vehicleType) 
    throw new Error("Pickup, destination, and vehicle type are required");

  try {
    // Get distance and time from your maps service
    const distanceTime = await getDistanceTime(pickup, destination);
    const baseFare = {
      Auto:30,
      Car:50,
      Bike:20
    }

    const perKmRate = {
      Auto:10,
      Car:15,
      Bike:8
    }

    const perMinuteRate={
      Auto:2,
      Car:3,
      Bike:1.5
    }

    console.log("this is distanceTime -> ",distanceTime);

    const fare = baseFare[vehicleType] 
      + ((distanceTime.distance.value/1000) * perKmRate[vehicleType]) 
      + ((distanceTime.duration.value/60) * perMinuteRate[vehicleType]) ;

    console.log(baseFare.Car 
      + ((distanceTime.distance.value/1000) * perKmRate.Car) 
      + ((distanceTime.duration.value/60) * perMinuteRate.Car));

    console.log("this is fare 1 -> ",fare);
    return fare;

  } catch (error) {
    throw error;
  }
}

function getOtp(num){
  function generateOtp(num) { 
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }

  return generateOtp(num);
}


// Generating fare and creating a ride
exports.createRide = async ({user,pickup,destination,vehicleType}) => {
  
  console.log("this ispickup:", pickup);
  console.log("destination:", destination);
  console.log("vehicleType:", vehicleType);

  try{

  
  if(!user || !pickup || !destination || !vehicleType){
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination, vehicleType);
  console.log("this is fare 2 -> ",fare);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp:getOtp(4),
    fare,
    });

    console.log("this is ride 1-> ",ride);

  return ride;
  }
  catch(err){
    throw err;
  }
}
