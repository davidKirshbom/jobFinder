import React, { useContext,useEffect } from 'react';

import { Route, Redirect } from 'react-router-dom'
import DataRoute from '../router/DataRoute'
import userContext from '../contexts/UserContext'

export default ({
    isAuthenticated
    , component: Component,
    ...rest
}) => {
    const { user,setUser } = useContext(userContext);
   
    return (
    
    <DataRoute {...rest} component={(props) => 
            user.data ? (
                <div>
               
                        <Component {...props} />
                       
                </div>
            ) : (
                    <Redirect to="/" />
                )
} />

)}


