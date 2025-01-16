import React from 'react';

const ConfirmRide = ({ selectedRide , onConfirmRide }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Ride</h3>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="font-semibold text-gray-800">Ride:</span> {selectedRide.rideName}
        </div>
        <div>
          <span className="font-semibold text-gray-800">Time Left:</span> {selectedRide.timeLeft}
        </div>
        <div>
          <span className="font-semibold text-gray-800">Price:</span> {selectedRide.price}
        </div>
        {/* Add Confirm or Cancel buttons */}
        <button
        onClick={onConfirmRide}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4">Confirm Ride</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded-lg mt-4">Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmRide;
