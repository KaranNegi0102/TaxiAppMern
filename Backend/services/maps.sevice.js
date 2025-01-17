//ek method se location ka coordinates like longitutde and latitude pata chalega 
// dusre method se do location ka distance pata chalega


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
        lat: location.lat,
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
