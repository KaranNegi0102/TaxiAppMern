import React from 'react';

const LookingForDriver = () => {
  console.log("looking for driver");
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-xl font-semibold text-gray-800">Looking for a Driver...</h2>
      <div className="mt-4 animate-pulse">
        <span className="text-gray-500">Please wait while we find the nearest driver...</span>
      </div>
    </div>
  );
};

export default LookingForDriver;
