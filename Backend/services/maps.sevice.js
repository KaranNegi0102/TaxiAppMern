//ek method se location ka coordinates like longitutde and latitude pata chalega 
// dusre method se do location ka distance pata chalega

const captainModel = require("../models/captainModel");
const axios = require('axios');


const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;
console.log("this is api key -> ",GOOGLE_MAPS_API_KEY);

module.exports.getAddressCoordinates = async (address) => {
  try {
    // Encode the address to make it URL-safe
    const encodedAddress = encodeURIComponent(address);
    // console.log("this is address  in mapsservice -> ", address);

    // Google Maps Geocoding API endpoint
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

    // Make a GET request to the Geocoding API
    const response = await axios.get(url);
    // console.log("this is response -> ",response);
    // console.log("this is response -> ",response.data);


    // Check if the response contains results
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;

      // Return the coordinates as an object
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (error) {
    // Handle errors (e.g., network issues, API errors, etc.)
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {

  if(!origin || !destination) throw new Error("Origin and destination are required");

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;

  try{
    const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`);
    console.log("this is response of mapsSercie -> ",response.data);
    
    if(response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
      throw new Error("No route found between the two locations");}

    if(response.data.status === "OK" && response.data.rows.length > 0 && response.data.rows[0].elements.length > 0){
      return  response.data.rows[0].elements[0];  
    }
    else{
      throw new Error("Error fetching distance and time");
    }

  }
  catch(err){
    console.log("this is error -> ",err);
  }

}

module.exports.autoComplete = async (input) => {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;

  if(!input) throw new Error("Input is required");

  try{
    const response = await axios.get(`https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAPS_API_KEY}`);

    if(response.data.status === "OK" && response.data.predictions.length > 0){
      return response.data.predictions;
    }
  }
  catch(err){
    // console.log("this is error -> ",err);
    res.status(500).json({message: "Internal server error"});
  }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  console.log("Latitude:", ltd);
  console.log("Longitude:", lng);
  console.log("Radius (km):", radius);

  

  console.log(await captainModel.findOne({
    location:{
      $geoWithin: {
        $centerSphere: [ [ lng, ltd ], radius / 6371 ]
      }
    }
  }));
  

  const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });
  console.log("Querying captains with:", { lng, ltd, radius });
  console.log("Captains found:", captains);

  return captains;


}