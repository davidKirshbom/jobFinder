import React,{useEffect} from 'react'
import { totalJobs } from '../../data/jobs'

export default () => {
    useEffect(()=>
    {
       
        let prevScrollpos = window.pageYOffset;
        window.addEventListener("scroll", () => {
            const currentScrollPos = window.pageYOffset;
            
            console.log(currentScrollPos);
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
       
           <div className="background-triangle mobile-only"></div>
        <div className="logo-container">    
           <img className="logo-image" src="https://www.jobinfo.co.il/Portals/_default/Skins/Jobinfo-2016Design/images/JI_logo_mobile.png" alt="" />
           <span className="logo-text">הרבה מעבר לחברת השמה</span>
       </div>
    </nav>)
}