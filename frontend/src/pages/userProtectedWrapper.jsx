import React,{ useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
const UserProtectedWrapper = ({children}) => {
  const {user,setUser} = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token") 
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status === 200){
        // console.log("this is response.data -> ",response.data);
        setUser(response.data);
        setIsLoading(false);
      }
    }).catch((err)=>{
      console.log(err);
      localStorage.removeItem("token");
      navigate('/login');
    })


  },[token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper
