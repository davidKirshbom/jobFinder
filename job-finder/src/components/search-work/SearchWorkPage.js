import React,{useEffect} from "react"
import SearchForm from './SearchForm'
import ResultList from './ResultList'
import FloatFilterMenu from './FloatFilterMenu'
export default () => {
    
    useEffect(() => {
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
    

    return (<div id="search-page">
    <div className="wrapper-content">
        <div className="page-content">
        <div className="flex-wrapper">
            <h1 className="page-title">חיפוש עבודה</h1>
            <SearchForm />
            <div className="result-section">
                
                <div>
                <ResultList />
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
            <FloatFilterMenu />
    </div>
</div>)
}