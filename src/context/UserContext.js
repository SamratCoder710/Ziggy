import React,{createContext, useState} from 'react';

export const UserContext = createContext();


export const UserContextProvider = ({children})=>{
    const [loggedInUser,setLoggedInUser] = useState(false);
    return(
        <UserContext.Provider value={{loggedInUser,setLoggedInUser}}>
            {children}
        </UserContext.Provider>
    )
}
