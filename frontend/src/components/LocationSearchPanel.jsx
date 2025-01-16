import React from 'react';

const LocationSearchPanel = ({ onLocationSelect }) => {
  const sampleLocations = [
    '214-B, Gautam Nagar, New Delhi',
    'B-14, Sector Mu1, Greater Noida',
    'C-23, Defence Colony, New Delhi',
    'H-213, Masjid Moth, New Delhi',
    'A-123, Sector 25, Noida',
    'B-456, Dwarka Sector-12, New Delhi',
    'G-22, South Ex, New Delhi',
    'F-1, Kalkaji, New Delhi',
    'H-43, Saket, New Delhi',
    'J-54, Rohini, New Delhi',
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended Locations</h2>

      {/* Scrollable Content Section */}
      <div
        className="flex flex-col gap-3 text-sm text-gray-700 overflow-y-auto"
        style={{ maxHeight: '250px' }}
      >
        {sampleLocations.map((location, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 cursor-pointer transition"
            onClick={() => onLocationSelect(location)} // Trigger location selection from parent
          >
            <span>{location}</span>
            <button
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
