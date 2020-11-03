import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom'
import userContext from '../contexts/UserContext'
export default ({
    isAuthenticated
    , component: Component,
    ...rest
}) => {
    const { user } = useContext(userContext);

    return (
    <Route {...rest} component={(props) => 
            user.data ? (
                <div>
                
                    <Component {...props} />
                </div>
            ) : (
                    <Redirect to="/" />
                )
} />)}


