import React from 'react'
import { totalJobs } from '../../data/jobs'
import ShareIcons from '../global/FloatShareIcons'
export default () => {
    return(<div className="panel-container">
        <div className="background-triangle"/>
        <ShareIcons/>
        <div className="panel_total-jobs">
            <div className="total-jobs-text">
                <span className="total-jobs-number">
                <span className="big-splitter splitter"></span>
                    {totalJobs}
                    </span>
                   <span className="total-jobs-subtitle">משרות מחכות לך</span> 
               </div>
        </div>
        <form className="search-work-form">
        <input className="job-name-input" type="text" placeholder="חפש משרה(לדוגמא: SEO,אבטחת מידע,C++,JAVA)"></input>
            <div  className="costum-select">
            
            <select id="arear-selection" className="area-select">    
                <option value = "tel-aviv-area">תל אביב-יפו</option>
                <option value = "south-area">אזור הדרום</option>
                <option value = "center-area">אזור המרכז</option>
                <option value="north-area">אזור הצפון</option>
                <option value="north-hasharon">אזור צפון השרון</option>
                <option value="out-of-country">חוץ לארץ</option>
                <option value="europe">Europe</option>
                <option value="far-east">Far East</option>
                <option value="USA">United States</option>
                <option selected="true" value="all-areas">כל האזורים</option>
            </select>
                <i href="#arear-selection" className="fas fa-angle-down"></i>
                </div>
            <button className="submit-btn" type="submit">חפש</button>
            <a className="advanced-search">חיפוש מתקדם</a>
         
        </form>
        <a className="send-CV"><i class="fab fa-studiovinari "></i> שלח קו"ח אלינו</a>
    </div>)
}