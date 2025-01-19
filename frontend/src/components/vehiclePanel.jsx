import React from 'react'


const VehiclePanel = ({fare,createRide}) => {
  return (
  <div>
    <h1 className="text-xl font-semibold mb-4 text-gray-800">Available Rides</h1>

    <div className="mb-4" >
      <h2 className="text-lg font-semibold text-gray-800">Auto Rides</h2>
      <ul className="space-y-4"> 
        <button onClick={()=>createRide("Auto")}>{fare.Auto}</button>
      </ul>
    </div>

    <div className="mb-4" onClick={()=>createRide("Car")}>
      <h2 className="text-lg font-semibold text-gray-800">Car Rides</h2>
      <ul className="space-y-4">
        {/* Displaying Car Rides */}
        <p>{fare.Car}</p>
      </ul>
    </div>

    <div className="mb-4" onClick={()=>createRide("Bike")}>
      <h2 className="text-lg font-semibold text-gray-800">Bike Rides</h2>
      <ul className="space-y-4">
        {/* Displaying Bike Rides */}
        <p>{fare.Bike}</p>
      </ul>
    </div>

  </div>
)}

export default VehiclePanel
