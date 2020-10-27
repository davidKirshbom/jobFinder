import React from 'react'
import { totalJobs } from '../../data/jobs'
import {Link} from 'react-router-dom'
import ShareIcons from '../global/FloatShareIcons'
import history from '../../router/history'
export default (props) => {
    const submitHandler = (e) => {
        e.preventDefault()
        const searchWord = e.target.elements[0].value
        const area_search = e.target.elements[1].value === 'all-areas' ? undefined : e.target.elements[1].value;

        history.push(`/search-work?searchWord=${searchWord}&location_area='${area_search}'`)
        console.log(e.target.elements[1].value)
        
    }
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
        <form onSubmit={submitHandler} className="search-work-form">
            <input className="job-name-input" type="text" placeholder="חפש משרה(לדוגמא: SEO,אבטחת מידע,C++,JAVA)"></input>
           
            <div  className="costum-select">
            <div>
            <select id="arear-selection" className="area-select">    
                <option value = "Tel-Aviv">תל אביב-יפו</option>
                <option value = "south">אזור הדרום</option>
                <option value = "Tel-Aviv,">אזור המרכז</option>
                <option value="north">אזור הצפון</option>
                <option value="hasharon">אזור צפון השרון</option>
                <option value="europe,USA,">חוץ לארץ</option>
                <option value="europe">Europe</option>
                <option value="far east">Far East</option>
                <option value="USA">United States</option>
                <option selected="true" value="all-areas">כל האזורים</option>
            </select>
                <i href="#arear-selection" className="fas fa-angle-down"></i>
                </div>
                </div>
            <button className="submit-btn" type="submit">חפש</button>
            <Link to="/search-work" className="advanced-search">חיפוש מתקדם</Link>
        </form>
        <a className="send-CV big-orange-butoon"><i class="fab fa-studiovinari "></i> שלח קו"ח אלינו</a>
    </div>)
}