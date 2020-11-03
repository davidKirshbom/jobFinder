import React,{useState,useEffect} from 'react'

import UserContext from './contexts/UserContext'
import Router from './router/router'
import "./styles/styles.scss"
export default () => {
    const [user, setUser] = useState( {})
    useEffect(() => {
        if (localStorage.getItem("userData"))
            setUser(JSON.parse(localStorage.getItem("userData")));
    },[])
    useEffect(() => {
        if(user)
        localStorage.setItem("userData",JSON.stringify( user))
       else localStorage.removeItem("userData")
    },[user,setUser])
    return (
        <div>
            <UserContext.Provider value={{user,setUser}}>
                <Router />
            </UserContext.Provider> 
        </div>
    )
}