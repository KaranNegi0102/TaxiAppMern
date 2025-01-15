import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CaptainLogout = () => {
  console.log("this is logout token" , localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
      headers:{
        Authorization : `Bearer ${token}`,
      },
      cookies:{token}
    }).then((response)=>{
      if(response.status === 200){
        console.log("this is logout response" , response);
        localStorage.removeItem("token");
        console.log("going to captain-login with below navigate");
        navigate('/captain-login');
      }
    })
    
  })
   


  return (
    <div>
      userLogout
    </div>
  )
}

export default CaptainLogout
