import React,{useState} from 'react'

export default ({isOpen,setIsOpen}) => {
    return (<div className={`login-bar-container  ${isOpen?"open":""}`}>
      
        <div className="exit-button-container">
        <i onClick={(e)=>setIsOpen(!isOpen)} className="fas fa-times close-extra-data"></i>
        </div>
        <form id="login-form">
            <input type="text" placeholder='דוא"ל/ שם משתמש'/>
            <input type="text" placeholder='סיסמא'/>
            <input type="submit" value="כניסה"/>
            <div className="forgot-password-text small-letters-container">שכחתי סיסמא</div>
            </form>
      
    </div>)
}