import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CaptainOTPverification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {}; // Get ride details from state
  const [otp, setOtp] = useState(generateOtp()); // Generate OTP when page loads
  const [enteredOtp, setEnteredOtp] = useState(""); // Passenger-entered OTP
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  if (!ride) {
    navigate("/");
    return null;
  }

  // Function to generate a 4-digit OTP
  function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generate random 4-digit OTP
  }

  // Function to handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (enteredOtp === otp) {
      setIsOtpVerified(true);
      alert("OTP verified! Ride started.");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Active Ride Details
        </h2>
        <div className="p-4 bg-blue-100 rounded-lg shadow-md mb-6">
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

        {/* OTP Section */}
        {!isOtpVerified ? (
          <>
            <div className="p-4 bg-yellow-100 rounded-lg shadow-md mb-6">
              <p className="text-gray-800 font-semibold">
                Share this OTP with the passenger:{" "}
                <span className="text-blue-600 text-lg">{otp}</span>
              </p>
            </div>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <label className="block text-gray-700">
                Enter OTP:
                <input
                  type="text"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </form>
          </>
        ) : (
          <div className="p-4 bg-green-100 rounded-lg shadow-md mb-6">
            <p className="text-green-800 font-semibold">
              OTP Verified! You can start the ride now.
            </p>
          </div>
        )}

        {/* Complete Ride Button */}
        {isOtpVerified && (
          <button
            onClick={() => navigate("/captain-riding", { state: { ride } })}
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 mt-4"
          >
            Start Ride
          </button>
        )}
      </div>
    </div>
  );
};

export default CaptainOTPverification;
