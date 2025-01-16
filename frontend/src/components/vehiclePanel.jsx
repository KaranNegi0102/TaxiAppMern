import React from 'react'


const VehiclePanel = ({groupedRides, onRideSelect}) => {
  return (
  <div>
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Rides</h3>

{/* Displaying Motorcycle Rides */}
{groupedRides.motorcycle.length > 0 && (
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Motorcycle Rides</h4>
    <ul className="space-y-4">
      {groupedRides.motorcycle.map((ride, index) => (
        <li key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100"
        onClick={() => onRideSelect(ride)}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{ride.rideName}</span>
            <span className="text-gray-500">Time Left: {ride.timeLeft}</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">{ride.price}</span>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Displaying Car Rides */}
{groupedRides.car.length > 0 && (
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Car Rides</h4>
    <ul className="space-y-4">
      {groupedRides.car.map((ride, index) => (
        <li key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100"
        onClick={() => onRideSelect(ride)}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{ride.rideName}</span>
            <span className="text-gray-500">Time Left: {ride.timeLeft}</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">{ride.price}</span>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Displaying Bike Rides */}
{groupedRides.bike.length > 0 && (
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800">Bike Rides</h4>
    <ul className="space-y-4">
      {groupedRides.bike.map((ride, index) => (
        <li key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100"
        onClick={() => onRideSelect(ride)}
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{ride.rideName}</span>
            <span className="text-gray-500">Time Left: {ride.timeLeft}</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">{ride.price}</span>
        </li>
      ))}
    </ul>
  </div>
)}
  </div>
     
  )
}

export default VehiclePanel
