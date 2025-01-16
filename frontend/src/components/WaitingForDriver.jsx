import React from 'react';

const WaitingForDriver = () => {
  console.log("waiting for driver");
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-xl font-semibold text-gray-800">Waiting for your Driver...</h2>
      <div className="mt-4 animate-pulse">
        <span className="text-gray-500">The driver is on their way! Please hold tight.</span>
      </div>
    </div>
  );
};

export default WaitingForDriver;
