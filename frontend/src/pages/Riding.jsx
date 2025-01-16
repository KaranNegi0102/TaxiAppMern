import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RidingPage = () => {
  // State for tracking ride progress (e.g., ETA, distance, etc.)
  // const [eta, setEta] = useState(rideDetails?.eta || "10 mins");
  // const [distance, setDistance] = useState(rideDetails?.distance || "5 km");
  // const [driverLocation, setDriverLocation] = useState(
  //   driverDetails?.location || "Driver's current location"
  // );

  // // Simulate ride progress updates
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Mock ETA and distance updates
  //     setEta((prevEta) => {
  //       const etaInMinutes = parseInt(prevEta.split(" ")[0]);
  //       return etaInMinutes > 1 ? `${etaInMinutes - 1} mins` : "Arriving now";
  //     });

  //     setDistance((prevDistance) => {
  //       const distanceInKm = parseFloat(prevDistance.split(" ")[0]);
  //       return distanceInKm > 0.5
  //         ? `${(distanceInKm - 0.5).toFixed(1)} km`
  //         : "Nearby";
  //     });
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex flex-col mt-8 items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <Link to="/home" >Home</Link>
        {/* Ride Info */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Your Ride is in Progress
        </h2>

        {/* Driver Details */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src= "https://via.placeholder.com/100"
            alt="Driver"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              { "John Doe"}
            </h3>
            <p className="text-sm text-gray-600">
              Vehicle: {"Toyota Corolla"}
            </p>
            <p className="text-sm text-gray-600">
              Plate: {"ABC-1234"}
            </p>
          </div>
        </div>

        {/* Ride Updates */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800">
              Estimated Time of Arrival:{" "}
              <span className="text-blue-600 font-bold">{}</span>
            </p>
            <p className="text-lg font-medium text-gray-800">
              Distance Remaining:{" "}
              <span className="text-blue-600 font-bold">{}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Current Location: {}
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-6 w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Map View (Coming Soon)</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700">
            Cancel Ride
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
            Contact Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidingPage;
