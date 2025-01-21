import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import { SocketContext } from '../context/SocketContext';


const CaptainHome = () => {

  
  const [isAvailable, setIsAvailable] = useState(true);
  const [availableRides, setAvailableRides] = useState([]);
  
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  


  useEffect(() => {
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
    })
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

              console.log({userId: captain._id,
                location: {
                    ltd: position.coords.latitude,
                    lng: position.coords.longitude
                }});

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            })
        }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
},[])

socket.on('new-ride',(data)=>{
  console.log(data); 
});



  useEffect(() => {
    setAvailableRides([
      { id: 1, pickUp: "123 Main St", destination: "456 Elm St", fare: "$15" },
      { id: 2, pickUp: "789 Oak St", destination: "321 Pine St", fare: "$20" },
    ]);
  }, []);

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  const handleAcceptRide = (ride) => {
    navigate("/captain-otp", { state: { ride } }); // Navigate to CaptainRiding with ride details
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {/* Driver Info Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Driver"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{captain.fullname.firstName +  " " + captain.fullname.lastName} </h2>
              <p className="text-gray-600">vehicleColour : {captain.vehicle.color}</p>
              <p className="text-gray-600">VehiclePlate : {captain.vehicle.plate}</p>
            </div>
          </div>
          <button
            onClick={handleToggleAvailability}
            className={`px-4 py-2 rounded-lg shadow-md ${
              isAvailable
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </button>
        </div>

        {/* Available Rides Section */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Available Rides
        </h3>
        <div className="space-y-4">
          {availableRides.length > 0 ? (
            availableRides.map((ride) => (
              <div
                key={ride.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Pick-up:</strong> {ride.pickUp}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> {ride.fare}
                  </p>
                </div>
                <button
                  onClick={() => handleAcceptRide(ride)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  Accept
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No rides available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
