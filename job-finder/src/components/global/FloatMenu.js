import React,{useEffect} from 'react';
import {Link} from "react-router-dom"
export default () => {
    useEffect(() => {
        const menuButton = document.getElementsByClassName("menu-btn")[0];
        menuButton.addEventListener("click", () => {
         
            if (menuButton.className === "menu-btn")
                menuButton.classList.add("open")
            else if (menuButton.classList.contains("open"))
                menuButton.classList.replace("open","close")
            else
                menuButton.classList.replace("close","open")

        })
        let prevOpenMenu;
        const menuItemsList = document.getElementsByClassName("menu-item")
        for (let index = 0; index < menuItemsList.length; index++)
        {
            const childrenList = menuItemsList[index].children
            if(childrenList.length>1)
                childrenList[0].addEventListener("click", (e) => {
                    if (prevOpenMenu)
                    {
                        prevOpenMenu.children[0].classList.remove('inner-menu-open')
                        prevOpenMenu.children[1].classList.remove('open')
                    }
                    if (!prevOpenMenu||prevOpenMenu.innerHTML !== menuItemsList[index].innerHTML) {
                        childrenList[0].classList.add("inner-menu-open")
                        childrenList[1].classList.add("open")
                        prevOpenMenu = menuItemsList[index];
                    }
                    else prevOpenMenu = null;
            })
        }
        let prevScrollpos = window.pageYOffset;
        window.addEventListener("scroll", () => {
            const currentScrollPos = window.pageYOffset;
            
            console.log(currentScrollPos);
            if (currentScrollPos>100&&prevScrollpos > currentScrollPos) { 
                document.getElementsByClassName("menu-btn")[0].classList.add("float-top","mobile-only");
              } else {
                document.getElementsByClassName("menu-btn")[0].classList.remove("float-top","mobile-only");
            }
            prevScrollpos = currentScrollPos;
            
        }
        )
    },[])
    return (
        <div className="menu-btn-wrapper">
        <div className="menu-btn close">
        <div className="lines-container">
            <div id="top-line" className="menu-btn__line"></div>
            <div id="middle-line" className="menu-btn__line"></div>
            <div id="buttom-line" className="menu-btn__line"></div>
                </div>
                </div>
        <div className="menu-container">
        <div className="bg-container"></div>
    
       <ul className="items-container">
            <li className="menu-item">
                        <Link className="menu-item-text" to="/search-work" >
                             
                 חיפוש עבודה<i className="fas fa-angle-down"></i>
                </Link>   
                </li>
                
            <li className="menu-item">
            <div className="menu-item-text" >דרושים בהייטק
            <i className="fas fa-angle-down"></i>
            </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first">דרושים תוכנה</li>
                    <li>דרושים אינטרנט</li>
                    <li>דרושים חומרה</li>
                    <li>דרושים תשתיות</li>
                    <li>דרושים מערכות מידע</li>
                </ul>
            </li>
            <li className="menu-item">
            <div className="menu-item-text" >
                    דף הבית
                <i className="fas fa-angle-down"></i>
            </div>
            </li>
            <li className="menu-item">
                <div className="menu-item-text" >השמת בכירים
                    <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first">פנייה אישית ודיסקרטית</li>
                </ul>
            </li>
            <li className="menu-item">
                <div className="menu-item-text" > פורום עבודה בהייטק
                    <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first">פורום דיני עבודה</li>
                    <li>פורום ניהול קריירה</li>
                </ul>
            </li>
            <li className="menu-item">
                <div className="menu-item-text" >טבלאות שכר
                     <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first">טבלאות שכר תוכנה</li>
                    <li>טבלאות שכר אינטרנט</li>
                    <li>טבלאות שכר חומרה</li>
                    <li>טבלאות שכר ביומד</li>
                    <li>טבלאות שכר שיווק ומכירות</li>
                    <li>טבלאות שכר משאבי אנוש</li>
                    <li>טבלאות שכר בכירים</li>
                </ul>
            </li>
        <li className="menu-item">
                <div className="menu-item-text">חברות הייטק <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first">אזורי הייטק בישראל</li>
                    <li>חברות הייטק בפתח תקווה</li>
                    <li>פארק הייטק ביקנעם</li>
                    <li>חברות הייטק בחיפה</li>
                    <li>פארק הייטק בבאר שבע</li>
                    <li>חברות הייטק בהרצליה</li>
                    <li>חברות הייטק בירושלים</li>
                </ul>
        </li>
            <li className="menu-item">
                <div className="menu-item-text">   מידע לחברות
                 <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first">פרופיל החברה</li>
                    <li>Outplacement</li>
                    <li>סדנאות מקצועיות</li>
                    <li>גיוס לפרויקטים מיוחדים</li>
                    <li>במיקור חוץ HR שירותי</li>
                    
                </ul>
            </li>
            <li className="menu-item">
                <div className="menu-item-text">   מידע למועמד
                    <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                    <li className="inner-menu-first"> פודקאסטים</li>
                    <li>מדריך וידאו למציאת עבודה</li>
                    <li>מגמות בשוק ההייטק</li>
                    <li>מדריך חיפוש עבודה</li>
                    <li>תנאים ושכר</li>
                    <li>מיומנויות אישיות</li>
                    <li>ביומד וקלינטק</li>
                    <li>בריאות בעבודה</li>
                </ul>
            </li>
            <li className="menu-item">
                <div className="menu-item-text">   אודתנו
                <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                 <li className="inner-menu-first"> פרופיל החברה</li>
                 <li>אודות חטיבת בכירים</li>
                 <li>הנבחרת שלנו</li>
                 <li>ההנהלה</li>
                 <li>מכתבי תודה</li>
                 <li>הערכים שלנו</li>
                 <li>סודות ופטריות</li>
                </ul>
            </li>
            <li className="menu-item">
                <div className="menu-item-text">   צור קשר
                    <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                <li className="inner-menu-first">  חברות</li>
               <li>מועמדים</li>
               </ul>
            </li>
            <li className="menu-item">
                <div className="menu-item-text">   About us
                 <i className="fas fa-angle-down"></i>
                </div>
                <ul className="inner-menu">
                <li className="inner-menu-first">Company Profile</li>
                    <li>Jobinfo Divisions</li>
                    <li>Management</li>
                    <li>Contact us</li>
               </ul>
                </li>
                </ul>
                </div>     
    </div>)
}