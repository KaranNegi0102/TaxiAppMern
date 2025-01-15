import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

   axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
    header:{
      Authorization : `Bearer ${token}`

    }
  }).then((response)=>{
    if(response.status === 200){
      localStorage.removeItem("token");
      navigate('/login');
    }
  })


  return (
    <div>
      userLogout
    </div>
  )
}

export default CaptainLogout
