import React from 'react';

const LocationPanel = ({ suggestions, setPickup, setDestination, activeInput }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeInput === 'pickup') {
      setPickup(suggestion);
    } else if (activeInput === 'destination') {
      setDestination(suggestion);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended Locations</h2>
      <div
        className="flex flex-col gap-3 text-sm text-gray-700 overflow-y-auto"
        style={{ maxHeight: '250px' }}
      >
        {suggestions.map((loc,idx)=>{
          <p key={idx}>{loc}</p>
        })}
      </div>
    </div>
  );
};

export default LocationPanel;
