import React from 'react';

const LocationSearchPanel = ({ suggestions, activeInput, setPickUp, setDestination ,setPanelOpen}) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeInput === 'pickUp') {
            setPickUp(suggestion.description); // Extract the correct property
        } else if (activeInput === 'destination') {
            setDestination(suggestion.description); // Extract the correct property
        }
        setPanelOpen(false); // Close the panel after selection
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended Locations</h2>
            <div className="flex flex-col gap-3 text-sm text-gray-700 overflow-y-auto" style={{ maxHeight: '250px' }}>
                {suggestions.map((location, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 cursor-pointer transition"
                        onClick={() => handleSuggestionClick(location)} // Correct function reference
                    >
                        <span>{location.description}</span> {/* Render the correct property */}
                        <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationSearchPanel;
