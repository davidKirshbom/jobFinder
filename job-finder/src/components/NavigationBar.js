import React,{useEffect} from 'react'
import { totalJobs } from '../data/jobs'
import FloatMenu from'./FloatMenu'
export default () => {
    useEffect(()=>
    {
        const menuButton = document.getElementsByClassName("menu-btn")[0];
        menuButton.addEventListener("click", () => {
         
            if (menuButton.className === "menu-btn")
                menuButton.classList.add("open")
            else if (menuButton.classList.contains("open"))
                menuButton.classList.replace("open","close")
            else
                menuButton.classList.replace("close","open")

        })
    }
        , [])
   return (<nav className="navigation-bar">
  
       <div className="navigation-content">
           <div className="menu-btn close">
               <div className="lines-container">
                <div id="top-line" className="menu-btn__line"></div>
                <div id="middle-line" className="menu-btn__line"></div>
                <div id="buttom-line" className="menu-btn__line"></div>
               </div>
           </div>
           <FloatMenu/>
           <ul className="navigation-links-container">
           <li id="loginbtn" className="nav-item">כניסה</li>
           <div className="splitter"></div>
               <li id="signinbtn" className="nav-item">הצטרפות</li>
           </ul>
           <div className="total-jobs">
               <div className="big-splitter splitter"></div>
               <div className="total-jobs-text">
               <span className="total-jobs-number">
               {totalJobs}
                   <span className="total-jobs-subtitle">משרות מחכות לך</span> 
               </span>
               </div>
           </div>
        </div>
       <div className="logo-container">
           <img className="logo-image" src="https://www.jobinfo.co.il/Portals/_default/Skins/Jobinfo-2016Design/images/JI_logo_mobile.png" alt=""/>
       <span className="logo-text">הרבה מעבר לחברת השמה</span>
       </div>
    
    </nav>)
}