import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel'; // Import VehiclePanel component
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {
  const [pickUp, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [rides, setRides] = useState([]); // State to hold ride data
  const [activeInput, setActiveInput] = useState(''); // Track active input (pickUp or destination)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false); // State to track if vehicle panel should be open
  const [selectedRide, setSelectedRide] = useState(null); // New state for selected ride
  const [isLookingForDriver, setIsLookingForDriver] = useState(false); // State for looking for driver
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);


  const formRef = useRef(null);
  const panelRef = useRef(null);
  const arrowRef = useRef(null);

  // Animate the panel's height
  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '200px', // Expand panel height
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(arrowRef.current, {
        rotate: '180deg', // Rotate arrow upward
        duration: 0.3,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0px', // Collapse panel height
        duration: 0.5,
        ease: 'power3.in',
      });
      gsap.to(arrowRef.current, {
        rotate: '0deg', // Reset arrow rotation
        duration: 0.3,
      });
    }
  }, [panelOpen]);

  // Animate the form sliding in from the right on page load
  useEffect(() => {
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pick up:', pickUp);
    console.log('Destination:', destination);

    // Simulating ride data (replace with actual data fetching logic)
    setRides([
      {
        rideName: 'Motorcycle Ride 1',
        timeLeft: '15 min',
        price: '$8',
        type: 'motorcycle',
      },
      {
        rideName: 'Car Ride 1',
        timeLeft: '30 min',
        price: '$25',
        type: 'car',
      },
      {
        rideName: 'Bike Ride 1',
        timeLeft: '10 min',
        price: '$5',
        type: 'bike',
      },
      {
        rideName: 'Motorcycle Ride 2',
        timeLeft: '25 min',
        price: '$12',
        type: 'motorcycle',
      },
      {
        rideName: 'Car Ride 2',
        timeLeft: '40 min',
        price: '$30',
        type: 'car',
      },
    ]);

    // Set vehiclePanelOpen to true if pickUp and destination are both selected
    if (pickUp && destination) {
      setVehiclePanelOpen(true); // Open vehicle panel
    }

    setPanelOpen(false); // Close the location panel after submission
  };

  const handleRideSelect = (ride) => {
    setSelectedRide(ride); // Set selected ride
  };

  const handleConfirmRide= ()=>{
    setIsLookingForDriver(true);

    setTimeout(() => {
      setIsLookingForDriver(false);
      setIsWaitingForDriver(true);
    }, 3000);
  }

  // Group rides by type (motorcycle, car, bike)
  const groupedRides = {
    motorcycle: rides.filter(ride => ride.type === 'motorcycle'),
    car: rides.filter(ride => ride.type === 'car'),
    bike: rides.filter(ride => ride.type === 'bike'),
  };

  // Handle location selection and open vehicle panel
  const handleLocationSelect = (location) => {
    if (activeInput === 'pickUp') {
      setPickUp(location); // Update pick-up location
    } else if (activeInput === 'destination') {
      setDestination(location); // Update destination location
    }
    setPanelOpen(false); // Close the location panel after selection
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
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl gap-4 justify-between items-start mt-8">
        {/* Trip Form */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div
            ref={formRef}
            className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            <h4 className="text-2xl font-bold mb-3 text-gray-800 text-center md:text-left">
              Find a Trip
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveInput('pickUp'); // Set the active input as pickUp
                }} // Open panel on click
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
                placeholder="Add a pick-up location"
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveInput('destination'); // Set the active input as destination
                }} // Open panel on click
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

          {/* Sliding Panel */}
          <div
            ref={panelRef}
            className="overflow-hidden bg-white w-full rounded-lg mt-4"
            style={{
              height: '0px', // Start collapsed
              transition: 'height 0.6s ease-in-out',
            }}
          >
            <LocationSearchPanel onLocationSelect={handleLocationSelect} />
          </div>

          {/* Arrow Toggle */}
          <div
            ref={arrowRef}
            onClick={() => setPanelOpen((prev) => !prev)} // Toggle panel on arrow click
            className="flex justify-center items-center mt-4 cursor-pointer bg-gray-700 p-2 rounded-full w-10 h-10 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 16.5l6-6H6l6 6z" />
            </svg>
          </div>
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

      {/* Render Vehicle Panel if both pickUp and destination are filled */}
      {vehiclePanelOpen && pickUp && destination && (
        <div ref={panelRef} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <VehiclePanel groupedRides={groupedRides} onRideSelect={handleRideSelect} />
        </div>
      )}

      {/* Show ConfirmRide panel if a ride is selected */}
      {selectedRide && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <ConfirmRide selectedRide={selectedRide}  onConfirmRide={handleConfirmRide}/>
        </div>
      )}

       {/* Looking for Driver */}
       {isLookingForDriver && !isWaitingForDriver && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <LookingForDriver />
        </div>
        
      )}

      {/* Waiting for Driver */}
      {isWaitingForDriver && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <WaitingForDriver />
        </div>
      )}
    </div>
  );
};

export default Home;
