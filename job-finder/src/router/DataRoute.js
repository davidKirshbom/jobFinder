import React from 'react'
import RightToolsBar from '../components/global/RightToolsBar'

import {  Route } from "react-router-dom";
export default (props) => {
    
    return (<div className="data-page ">
        <RightToolsBar />
        <Route {...props} ></Route>
        </div>
    )
}