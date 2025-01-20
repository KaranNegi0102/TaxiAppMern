import React , { useState } from 'react'
import {createContext} from 'react'


export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {
  const [captain,setCaptain] = useState({
    fullname: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  console.log("this is captain in captainCOntext -> ",captain);

  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  return (
    <CaptainDataContext.Provider value={{captain,setCaptain,isLoading,setIsLoading,error,setError}}> 
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
