import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CaptainRiding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {}; // Get ride details from state

  if (!ride) {
    // Redirect back to the driver home page if no ride data is passed
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Active Ride Details
        </h2>
        <div className="mb-4 w-full h-full">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD7s6c1-jkyKuc6Yy3ch2HiApmciFhXacwQ&s"></img>
        </div>
        <div className="p-4 mt-5 bg-blue-100 rounded-lg shadow-md mb-6">
          <p className="text-gray-700">
            <strong>Pick-up:</strong> {ride.pickUp}
          </p>
          <p className="text-gray-700">
            <strong>Destination:</strong> {ride.destination}
          </p>
          <p className="text-gray-700">
            <strong>Fare:</strong> {ride.fare}
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Complete Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainRiding;
