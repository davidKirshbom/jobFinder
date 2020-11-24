import React, { useEffect, useState } from "react"
import axios from 'axios'
import {useLocation,useHistory} from 'react-router-dom'
import SearchForm from './SearchForm'
import ResultList from './ResultList'
import ResultListNode from '../search-work/ResultListNode'
import FloatFilterMenu from './FloatFilterMenu'
import {locationsAreas as locationDictonary} from './dictionaty'
export default () => {
    const [resultOffset,setResultOffset]=useState(0);
    const [jobsList, setJobsList] = useState({rows:[],total:0});
    const [activeFilters, setActiveFilters] = useState({});
    const [sortBy,setSortBy]=useState({isAscending:true})
    const queryParms = new URLSearchParams(useLocation().search);
    const history = useHistory();
   
    const handleSearchAtStart = () => {
        const searchWordInput = document.getElementById('search-word-input');
        const areasFillterList = document.getElementById('location_checkbox').children;
       searchWordInput.value = (queryParms.get('searchWord'));
     
       for (let index = 0; index < areasFillterList.length; index++)
       {
           console.log("filter ","'"+locationDictonary.get(areasFillterList[index].textContent)+"'","\nparams ",queryParms.get('location_area') )
           if ("'" + locationDictonary.get(areasFillterList[index].textContent) + "'" === queryParms.get('location_area'))
               areasFillterList[index].firstChild.checked = true;
            
        }
       
       setActiveFilters({ location_area:queryParms.get('location_area')||'',positions:queryParms.get('position_name'),type:queryParms.get('category')})//useEffect fires new search
       console.log("🚀 ~ file: SearchWorkPage.js ~ line 31 ~ handleSearchAtStart ~ queryParms.get('category')", queryParms.get('category'))
       console.log("🚀 ~ file: SearchWorkPage.js ~ line 31 ~ handleSearchAtStart ~ queryParms.get('position_name')", queryParms.get('position_name'))
        history.replace({
            search: '',
          })
    }

    useEffect(() => {
        handleSearchAtStart();
        
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
   
    useEffect(()=>(() => {
        newSearch()
        
    })(), [resultOffset, activeFilters, sortBy])
    const newSearch = () => {  
                
        const form = document.getElementById("new-search-form");
        const searchWord = form.children[1].value;
        const isSenor = document.getElementById("senior-checkbox").checked;
        const isSearchOnlyLastWeek = document.getElementById('last-week-jobs-radio-btn').checked;          
        console.log(`queryParms.get('position_name')`,queryParms.get('position_name'))
            try {
              axios.get('http://localhost:3000/jobs',
                    {
                        params: {
                            sortBy:sortBy,
                            searchWord: searchWord,
                            isSenorSearch: isSenor,
                            job_type:activeFilters&&activeFilters.type? activeFilters.type:"",
                            positions:activeFilters&&activeFilters.positions? activeFilters.positions:"",
                            location_area:activeFilters&&activeFilters.location_area? activeFilters.location_area:"",
                            resultsLimit: '80',
                            resultOffset: resultOffset,
                            openJobsOnly: true,
                            dateLimits: isSearchOnlyLastWeek,
                        }
                    }
              ).then((response) => {
                console.log(response.data)
                  setJobsList({rows: response.data.rows,total:response.data.total });
                })
            } catch (err) {
                console.log("problem ocuured",err)
        }
   
        
    
    }
    const fillter = (filterObj) => {
        setActiveFilters(filterObj)
    }
 
    return (<div id="search-page">
    <div className="wrapper-content">
        <div className="page-content">
        <div className="flex-wrapper">
            <h1 className="page-title">חיפוש עבודה</h1>
                    <SearchForm handleSearch={function handleSearch(e)  {
                        e.preventDefault();
                        setResultOffset(0)
                        newSearch().then();
                    }}/>
            <div className="result-section">
                
                <div>
                            <ResultList
                                totalResults={jobsList.total||""}
                                resultOffset={resultOffset||""}
                                setResultOffset={setResultOffset||""}
                                jobsList={jobsList.rows || ""}
                                setSort={setSortBy || ""}
                                sortObj={sortBy || ""}
                                NodeComponent={ResultListNode || ""}
                            />
                
                            <div className="jobs-button-container">
                
                    <div className="fixed-bg for-mobile-only">
                    <a className="send-CV big-orange-butoon desktop"><i className="fab fa-studiovinari "></i> שלח קו"ח </a>
                    </div>
                    <a className="new-search-button"><i className="fas fa-search" aria-hidden="true"></i>חיפוש חדש</a>
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
                            <i className="fas fa-question-circle"></i>
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
            <FloatFilterMenu filterHandler={(obj)=>
            {
               
                        setResultOffset(0)
                        fillter(obj);}
                
            } />
         
    </div>
</div>)
}