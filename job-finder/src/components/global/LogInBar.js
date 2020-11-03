import React, { useState,useContext } from 'react'
import userContext from '../../contexts/UserContext'
import axios from 'axios'
export default ({ isOpen, setIsOpen }) => {
    const {user, setUser} = useContext(userContext);
    const [isBadLoginData,setIsBadLoginData]=useState(false)
    const handleLogin =async (email, password) => {
        axios.post('http://localhost:3000/users/login', {
            headers: { 'Content-Type': 'application/json' },
            data: ({ email, password })
        }).then((value) => {
            setUser({ data: value.data.user, token: value.data.token });
        
            setIsBadLoginData(false)
            setIsOpen(false);
        }).catch(err => {
            if (err.response.data.code === 401)
                setIsBadLoginData(true)
            else
                throw new Error('bad connection')
        })
    }
    return (<div className={`login-bar-container  ${isOpen?"open":""}`}>
      
        <div className="exit-button-container">
        <i onClick={(e)=>setIsOpen(!isOpen)} className="fas fa-times close-extra-data"></i>
        </div>
        <form onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.children[0].value;
            const password = e.target.children[2].value;
            
            await handleLogin(email,password)
            
        }} id="login-form">
          
            <input type="text" placeholder='דוא"ל/ שם משתמש' />
            <label className="small-letters-container unvalid-label bad-login-error" hidden={!isBadLoginData}>הפרטים שהוזנו אינם נכונים</label>
           
            <input type="text" placeholder='סיסמא' />
            <input  type="submit" value="כניסה"/>
            <div className="forgot-password-text small-letters-container">שכחתי סיסמא</div>
            </form>
      
    </div>)
}