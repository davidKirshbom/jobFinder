import React, { useEffect, useState } from "react"
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import SearchForm from './SearchForm'
import ResultList from './ResultList'
import FloatFilterMenu from './FloatFilterMenu'

export default () => {
    const [jobsList, setJobsList] = useState();
    const [activeFilters, setActiveFilters] = useState({});
    const queryParms = new URLSearchParams(useLocation().search);
    const isSearchResultOpen = useLocation().search !== "";
    useEffect(() => {
      
        if(!isSearchResultOpen)
        {axios.get('http://localhost:3000/jobs',
            {
                params: {
                    resultsLimit: '20',
                    openJobsOnly:true
                }
            }
        ).then((response) => {  
            setJobsList(response.data);
        })
        }
        else {
            axios.get('http://localhost:3000/jobs',
            {
                params: {
                    sortBy: queryParms.get('sortBy'),
                    searchWord: queryParms.get('searchWord'),
                    isSenorSearch: queryParms.get('isSenorSearch'),
                    job_type: queryParms.get('job_type'),
                    positions: queryParms.get('positions'),
                    location_area:queryParms.get('location_area'),
                    resultsLimit: '20',
                    resultOffset:'0',
                    openJobsOnly:true
                }
            }
        ).then((response) => {  
            setJobsList(response.data);
        })
        }
        const newSearchTooogle = document.getElementsByClassName("new-search-open-form-toggle")[0];
        const form = document.getElementsByClassName("search-form-container")[0];
        newSearchTooogle.addEventListener("click", () => {
            if (form.classList.contains("open"))
            {
                form.classList.remove("open");
                newSearchTooogle.children[0].classList.remove("point-left")
            }
            else
            {
                form.classList.add("open");
                newSearchTooogle.children[0].classList.add("point-left");
            }
        })
    }, [])
    useEffect(() => {newSearch() },[activeFilters])
    const newSearch = (event) => {   
       
            if (event&&event.preventDefault) 
                event.preventDefault();
            const form = document.getElementById("new-search-form");
            const searchWord = form.children[1].value;
            const isSenor = document.getElementById("senior-checkbox").checked;
            const radioBtnGroup = form.children[3];
            let newJobsList;
            console.log(activeFilters)
            try {
              axios.get('http://localhost:3000/jobs',
                    {
                        params: {
                            searchWord: searchWord,
                            isSenorSearch: isSenor,
                            job_type: activeFilters&&activeFilters.type||"",
                            positions: activeFilters&&activeFilters.positions||"",
                            location_area: activeFilters&&activeFilters.location_area||"",
                            resultsLimit: '20',
                            resultOffset: '0',
                            openJobsOnly: true
                        }
                    }
              ).then((response) => {
                    console.log(response)
                    setJobsList(response.data);
                })
            } catch (err) {
                console.log("problem ocuured",err)
            }
        
    
    }
    const fillter = (filterObj) => {
      
        setActiveFilters(filterObj)
        console.log(activeFilters)
        // newSearch(undefined)
        
    }
    return (<div id="search-page">
    <div className="wrapper-content">
        <div className="page-content">
        <div className="flex-wrapper">
            <h1 className="page-title">חיפוש עבודה</h1>
                    <SearchForm handleSearch={newSearch}/>
            <div className="result-section">
                
                <div>
                <ResultList jobsList={jobsList||""}/>
                <div className="jobs-button-container">
                
                    <div className="fixed-bg for-mobile-only">
                    <a className="send-CV big-orange-butoon desktop"><i class="fab fa-studiovinari "></i> שלח קו"ח </a>
                    </div>
                    <a className="new-search-button"><i class="fas fa-search" aria-hidden="true"></i>חיפוש חדש</a>
                </div>
                </div>
                
                   
            </div>
            <div className="content-footer">
                
                <p className="footer-text">
                    

                    מנוע חיפוש עבודה של Jobinfo מאפשר לך למצוא מגוון משרות טכנולוגיות בתחום התוכנה, חומרה, אינטרנט, הנדסת מכונות, תשתיות, ביומד, ניהול, שיווק, ועוד. מאגר המשרות של Jobinfo הוא מהגדולים בתחום ההייטק, ומתעדכן מידי יום במשרות חדשות המתפרסמות בחברות גדולות, סטארט-אפים ומרכזי פיתוח בינ"ל הממוקמים בכל הארץ.

                    לקבלת תוצאות חיפוש עליך לבחור לפחות תחום אחד ותפקידים מתאימים. 

                </p>
                <div className="how-to-use desktop-only">
                   
                    <img className="how-to-use-image" src={require('../../images/searchhelp.jpg')} alt="" />
                    <div className="help-text-container">
                        <div className="header">
                            <div className="title">איך להשתמש במנוע חיפוש עבודה בהייטק</div>
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <p>
                            חיפוש עבודה בהייטק בעזרת מנוע חיפוש המשרות של Jobinfo מאפשר לך להגדיר באופן פרטני מה המשרה המבוקשת לפי תחום, תפקיד ומשתנים נוספים.
                            חיפוש עבודה אפקטיבי רצוי שיכיל תחום, תפקיד ומילות מפתח. כאשר לא מתקבלות עבודות מתאימות בדוק האם הגדרת פרמטרים רבים מדיי.
                        </p>
                        <p>
                        להגדלת יעילות החיפוש הוספנו אפשרות של חיפוש עבודה בשדה טקסט חופשי. חיפוש עבודה המכיל מידע על טווח שכר זמין למשתמשים רשומים בלבד. לקבלת תוצאות חיפוש משרות עליך לבחור תחום אחד מתוך "תחום המשרה".
                        </p>
                    </div>
                </div>
            </div>
                </div>
                </div>
            <FloatFilterMenu filterHandler={fillter}/>
    </div>
</div>)
}