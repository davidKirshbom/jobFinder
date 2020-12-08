import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import history from '../../router/history'
import { jobsByCategoryId } from '../../server/jobsDB'
export default () => {
    const [positionsList, setPositionsList] = useState([])
    useEffect(() => {
        jobsByCategoryId(3).then(
            (result)=>setPositionsList(result)
        )
    
    }, [])
 return   (<div className='wanted-page'>
        <h2>דרושים אינטרנט</h2>
        <p>
         חברת ג'ובאינפו היא חברת השמה המתמקדת בעובדי
         <span className='emphasis'>ההייטק</span>
         בישראל. פעילותה של החברה אשר החלה בשנת 1999, צמחה בד בבד עם התפתחותה של תעשיית ההייטק הישראלית. היכרות מעמיקה עם החברות המובילות בתחום, בכירי הענף ואנשי הגיוס האמונים על איתור כישרונות ואיוש משרות
             <span className='emphasis'>דרושים הייטק</span>
             מאפשרת לג'ובאינפו להיות עם האצבע על הדופק בכל הנוגע למגמות ועדכונים בתחום ההייטק. צוות ההשמה שלנו לתפקידים בתחום האינטרנט יוכל לעדכן אתכם במגמות טכנולוגיות, טרנדים, תפקידים מבוקשים
         <span className='emphasis'>וטבלאות השכר,</span>
         מרמת הפיתוח, מומחי טכנולוגיה, ראשי צוותים ועד לתפקידי דירקטור ומנכ"ל. אנחנו נותנים מענה גם למשרות שאינן עוסקות ישירות בפיתוח טכנולוגיה: מעצבים, אנשי שיווק, אנשי תוכן ועוד.
     </p>
        <h3 className='gray-title'> עבודה בהייטק עם ג'וב אינפו</h3>
        <p>
        ג'ובאינפו היא השותף המומלץ בכל הנוגע למציאת האתגר המקצועי הבא בשבילכם בתחום ההייטק. לפניכם מגוון משרות דרושים אינטרנט, במידה ואחת המשרות נראית לכם כמתאימה לכישוריכם, תוכלו לסמנה ולהעביר את פרטיכם לאיש הצוות הרלוונטי בחברת ג'ובאינפו אשר יבחן את התאמתכם.
            </p>
       
        <div className='positions-list-container'>
         <ul>
             {positionsList.map((position) => <Link to={{
                 pathname:'/search-work',
                 search:`position_name=${position.name}&category=internet`,

             }} >{position.name} <span className='small-letters-container'>({position.count})</span></Link>)}
         </ul> 
     
     </div>
     <Link className='orange-button search-work-button' to='/search-work'>למשרות הייטק נוספות</Link>
    </div>  )
}