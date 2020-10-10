import React,{useEffect} from 'react';

export default () => {
    useEffect(() => {
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
    },[])
    return (
        <div className="menu-container">
       <ul className="items-container">
            <li className="menu-item">
                <div className="menu-item-text" >
                 חיפוש עבודה<i className="fas fa-angle-down"></i>
                </div>   
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
     
    </div>)
}