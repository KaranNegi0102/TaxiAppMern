import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel'; // Import LocationSearchPanel component
import VehiclePanel from '../components/VehiclePanel'; // Import VehiclePanel component
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';

import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [ pickup, setPickup ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);
  const [rides, setRides] = useState([]); // State to hold ride data
  const [activeInput, setActiveInput] = useState(null); // Track active input (pickUp or destination)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false); // State to track if vehicle panel should be open
  const [selectedRide, setSelectedRide] = useState(null); // New state for selected ride
  const [isLookingForDriver, setIsLookingForDriver] = useState(false); // State for looking for driver
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);
  const [pickUpSuggestions , setPickUpSuggestions] = useState([]);
  const [destinationSuggestions , setDestinationSuggestions] = useState([]);
  const [vehicleType , setVehicleType] = useState(null);
  const [fare , setFare] = useState({});
  const [confirmRidePanel , setConfirmRidePanel] = useState(false);

  const formRef = useRef(null);
  const panelRef = useRef(null);
  const arrowRef = useRef(null);

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  console.log(user);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [ user ])

  // socket.on('ride-confirmed', ride => {
  //     setVehicleFound(false)
  //     setWaitingForDriver(true)
  //     setRide(ride)
  // })

  // socket.on('ride-started', ride => {
  //     console.log("ride")
  //     setWaitingForDriver(false)
  //     navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  // })

  // Animate the panel's height
  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '300px', // Expand panel height
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
    console.log('Pick up:',   pickup);
    console.log('Destination:', destination);
  };

  const handlePickupChange = async (e)=>{
    setPickup(e.target.value);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {params : {input : e.target.value},
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }}
      )
      console.log("this is response pickup -> ",response.data);
      setPickUpSuggestions(response.data);
    }
    catch(err){
      console.log(err);
    }
  }


  const handleDestinationChange = async (e)=>{
    setDestination(e.target.value);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {params : {input : e.target.value},
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }}
      )
      console.log("this is response destination -> ",response.data);
      setDestinationSuggestions(response.data);
    }
    catch(err){
      console.log(err);
    }
  }

  console.log("this is pickup -> ",pickUpSuggestions);

  async function findTrip(){
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    setConfirmRidePanel(false);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params : {pickup,destination},
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log("this is response -> ",response.data);
    setFare(response.data);


    }

    async function createRide() {

      try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
          {
          pickup,
          destination,
          vehicleType
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      console.log("this is response -> ",response.data);

      }catch(err){
        console.log(err);
        console.log("this is the error -> ",err);
      }


      

  }

  // console.log("this is user object in home",user)


  return (
    <div className="flex flex-col px-4 py-2 text-gray-800 bg-gray-700 min-h-screen">
      {/* Logo Section */}
      <div>{user.email}</div>
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
                value={pickup}
                onChange={handlePickupChange}
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
                onChange={handleDestinationChange}
                placeholder="Enter your destination"
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={findTrip}
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
            <LocationSearchPanel 
                  suggestions={activeInput === 'pickUp' ? pickUpSuggestions : destinationSuggestions}
                  setPickUp={setPickup}
                  setDestination={setDestination}
                  activeInput={activeInput}
                  setPanelOpen={setPanelOpen}
              />

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
      {vehiclePanelOpen && pickup && destination && (
        <div ref={panelRef} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <VehiclePanel 
          vehicleType={setVehicleType} 
          fare={fare} 
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      )}

      {/* Confirm Ride Panel */}
      {confirmRidePanel && (
        <div ref={panelRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12">
          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setIsLookingForDriver={setIsLookingForDriver}
          />
        </div>
      )}

      

       {/* Looking for Driver */}
       {isLookingForDriver && (
         <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
         <LookingForDriver fare={fare} pickup={pickup} destination={destination} vehicleType={vehicleType}/>
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
