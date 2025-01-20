import React, { createContext } from 'react'
import { useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {

  const [user, setUser] = useState({
    fullname:{
      firstName: "",
      lastName: ""
    },
    email:""
    
  });

  console.log("user yeh h in userContext --> ", user);

  return (
    <div>
      <UserDataContext.Provider value={{user, setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
