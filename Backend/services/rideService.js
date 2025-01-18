const rideModel = require("../models/rideModel");
const { getDistanceTime } = require("../services/maps.service");

async function getFare(pickup, destination) {
  if (!pickup || !destination || !vehicleType) 
    throw new Error("Pickup, destination, and vehicle type are required");

  try {
    // Get distance and time from your maps service
    const distanceTime = await getDistanceTime(pickup, destination);

    const baseFare = {
      auto:30,
      car:50,
      bike:20
    }

    const perKmRate = {
      auto:10,
      car:15,
      bike:8
    }

    const perMinuteRate={
      auto:2,
      car:3,
      bike:1.5
    }


    const fare = {
      auto: baseFare.auto + distanceTime.distance * perKmRate.auto + distanceTime.time * perMinuteRate.auto,
      car: baseFare.car + distanceTime.distance * perKmRate.car + distanceTime.time * perMinuteRate.car,
      bike: baseFare.bike + distanceTime.distance * perKmRate.bike + distanceTime.time * perMinuteRate.bike
    }

    return fare;
  } catch (error) {
    throw error;
  }
}

// Generating fare and creating a ride
exports.createRide = async ({user , pickup, destination, vehicleType}) => {
  
  if(!user || !pickup || !destination || !vehicleType){
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    });

  return ride;
};
