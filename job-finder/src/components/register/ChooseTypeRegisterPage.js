import React from 'react'
import { Link } from 'react-router-dom'
import CompanyRegisterPage from './CompanyRegisterPage'
export default () => {
    
    return (
        <div className="register-buttons-container">
            <Link to="/register/user" className="search-work-register-button">מחפש עבודה</Link>
            <Link to="/register/company"  className="company-register-button">מחפש עובדים</Link> 
        </div>)
}