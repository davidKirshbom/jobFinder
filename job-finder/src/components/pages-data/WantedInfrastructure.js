import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import history from '../../router/history'
export default () => {
    const [positionsList, setPositionsList] = useState([])
    useEffect(() => {
         axios.get('http://localhost:3000/utils/jobs-by-category?categoryId=5').then(
                (result)=>setPositionsList(result.data.data)
            )
            
        
       
    }, [])
 return   (<div className='wanted-page'>
        <h2>דרושים תשתיות</h2>
        <p>
         תחום התשתיות מתייחס אל הבסיס של כל מערכת מחשוב: תשתיות מחשוב ותקשורת מחשבים. התשתיות כוללות רכיבי חומרה ותוכנה, שרתים, תחנות קצה, רכיבי רשת, תשתיות תקשורת, רשתות מחשבים,
         <span className='emphasis'>אבטחת מידע </span> 
         תמיכת מחשוב. כיום כל עסק או חברה זקוקים לאנשים העוסקים בתחום התשתיות, שכן הם אלה שבזכותם מתבצע תכנון התשתיות במקום בצורה המיטבית, והם אחראים לוודא שהכל פועל בצורה תקינה וחלקה, ללא תקלות.
         </p>
        <h3 className='gray-title'> דרושים לתפקידי תשתיות בהייטק</h3>
     <p>
         תחום התשתיות הוא תחום מרתק, מאתגר ומורכב, ולכן לא מפתיע שישראלים רבים לומדים אותו ומעוניינים לעסוק בו. חברות
         <span className='emphasis'>הייטק</span> 
         רבות, כמו גם משרדי ממשלה ועסקים בתחומים מגוונים, מחפשים תדיר אנשים שעוסקים בתחום. משרות בתחום התשתיות כוללות בין היתר טכנאי PC, מפעיל מחשב, מנהל מחשוב, מהנדס מערכת, סיסטם אדמין ותמיכה טכנית.
     </p>
     <h3 className='gray-title'>ג'ובאינפו מוצאת לכם עבודה בתחום התשתיות</h3>

        <p>
        במאגר המשרות שלפניכם תוכלו למצוא מגוון משרות איכותיות בתחום התשתיות. חברת ג'ובאינפו נמצאת בקשר עם החברות המובילות בשוק ומקפידה תמיד להיות עם אצבע על הדופק בכל מה שקשור לעבודה בתשתיות. אם אחת או יותר מהמשרות שלפניכם נראית לכם מתאימה לכישוריכם, השכלתם וניסיונכם בתחום התשתיות, הנכם מוזמנים לשלוח קורות חיים וחברת ג'ובאינפו, המתמחה בהשמה בתחום התשתיות, תעשה את מירב המאמצים למצוא עבורכם את המשרה המתאימה ביותר.
     </p>
        <div className='positions-list-container'>
         <ul>
             {positionsList.map((position) => <Link to={{
                 pathname:'/search-work',
                 search:`position_name=${position.name}&category=infrastructure`,
                 }} >{position.name} <span className='small-letters-container'>({position.count})</span></Link>)}
         </ul> 
     
     </div>
     <Link className='orange-button search-work-button' to='/search-work'>למשרות הייטק נוספות</Link>
    </div>  )
}