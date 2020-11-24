import React, { useEffect, useState, useContext } from 'react'

import userContext from '../../contexts/UserContext';
import axios from 'axios'
import { totalJobs } from '../../data/jobs'
import { Link } from 'react-router-dom'

export default ({ onLoginPress }) => {
    const [jobsCount, setJobsCount] = useState(0);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, setUser } = useContext(userContext)

    console.log("user", user)
    useEffect(() => {
        try
       { axios.get('http://localhost:3000/utils/get-jobs-count').then((value) => {
           console.log(value.data[0].count)
           setJobsCount(value.data[0].count)
       }).catch(err=>console.log(err))
        } catch (err) {
            console.log(err)
        }
    },[])
    useEffect(()=>
    {
       
        let prevScrollpos = window.pageYOffset;
        window.addEventListener("scroll", () => {
            const currentScrollPos = window.pageYOffset;
            
       
            if (currentScrollPos>100&&prevScrollpos > currentScrollPos) { 
                document.getElementsByClassName("navigation-bar")[0].classList.add("float-top","mobile-only");
              } else {
                document.getElementsByClassName("navigation-bar")[0].classList.remove("float-top","mobile-only");
            }
            prevScrollpos = currentScrollPos;
            
        }
        )
    }
        , [])
    return (<nav className="navigation-bar">
       
       <div className="darken-skin mobile-only"></div>
            <div className="navigation-content">
            {user.data ?
                <div className="user-detail-container">
                    <span onClick={(e)=>setIsUserMenuOpen(!isUserMenuOpen)} className={`name-title ${isUserMenuOpen?"open":""}`}>{user.data.first_name||user.data.name}<i className="fas fa-chevron-down"></i></span>   
                    <ul className={` user-menu-container ${isUserMenuOpen?"open":""}`}>
                        <Link to={user.data.user_type==='user'?'/register/user':'/register/company'} onClick={()=>setIsUserMenuOpen(false)}>עדכון פרטים וקו"ח</Link>
                        <li onClick={(e) => {
                            setUser({})
                            setIsUserMenuOpen(false)
                        }}  >יציאה</li>
                       {user.data&&user.data.user_type==='company'? <Link to='/my-jobs-wall'>נהל עבודות</Link>:''}
                    </ul>
                </div> : ""}
                <ul className={`navigation-links-container ${user.data?"hide":""}`}>
                    <li onClick={()=>onLoginPress()} id="loginbtn" className="nav-item">כניסה</li>
                    <div className="splitter"></div>
                    <Link to="/register" id="signinbtn" className="nav-item">הצטרפות</Link>
                </ul> 
                <div className="total-jobs">
                    <div className="big-splitter splitter"></div>
                    <div className="total-jobs-text">
                    <span className="total-jobs-number">
                        {jobsCount}
                        <span className="total-jobs-subtitle">משרות מחכות לך</span> 
                    </span>
                </div>
               
            </div>
            
        </div>
        
        <div className="triangle-container">
           <div className="background-triangle mobile-only"></div>
           </div>
            <div className="logo-container">
        <Link to="/">  
           <img className="logo-image" src="https://www.jobinfo.co.il/Portals/_default/Skins/Jobinfo-2016Design/images/JI_logo_mobile.png" alt="" />
        </Link> 
            <span className="logo-text">הרבה מעבר לחברת השמה</span>
       </div>
    </nav>)
}