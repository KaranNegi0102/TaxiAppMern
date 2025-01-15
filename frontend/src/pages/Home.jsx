import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Home = () => {
  const [pickUp, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    // Animate the form from the right side when the page loads
    gsap.fromTo(
      formRef.current,
      { x: '100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pick up:', pickUp);
    console.log('Destination:', destination);
    setPickUp('');
    setDestination('');
  };

  return (
    <div className="flex flex-col px-4 py-2 text-gray-800 bg-gray-700 min-h-screen">
      {/* Logo Section */}
      <div className="flex flex-col items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-JiKjZXhUDnG5fa4Dra2ntuAIeV7iGcWnlw&s"
          alt="logo"
          className="w-20 h-20 rounded-full"
        />
        <h1 className="text-2xl font-semibold mt-2 text-white">RideNow</h1>
      </div>

      {/* Main Section */}
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl gap-4 md:gap-8 justify-between items-center mt-8">
        {/* Trip Form */}
        <div
          ref={formRef}
          className="w-full md:w-1/2 p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
          style={{ zIndex: 10 }}
        >
          <h4 className="text-2xl font-bold mb-3 text-gray-800 text-center md:text-left">
            Find a Trip
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              placeholder="Add a pick-up location"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA08A8nC2TN9Vnv5zLo0Z7gqZOxxFbji6Ew&s"
            alt="map"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
