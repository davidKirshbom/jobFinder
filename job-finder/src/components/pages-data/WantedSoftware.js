import React,{useEffect,useState} from 'react'

import {Link} from 'react-router-dom'
import history from '../../router/history'
import { jobsByCategoryId } from '../../server/jobsDB'
export default () => {
    const [positionsList, setPositionsList] = useState([])
    useEffect(() => {

        jobsByCategoryId(2).then(
            (result)=>setPositionsList(result)
        )  
    }, [])
 return   (<div className='wanted-page'>
        <h2>דרושים תוכנה</h2>
        <p>
            תחום התוכנה הוא אחד מאבני היסוד של תעשיית ההייטק בישראל. הדרישה לכישרונות ואנשי מקצוע מיומנים בתחום נפרסת מן החברות הגדולות 
            והוותיקות ביותר 
            <span className='emphasis'>בהייטק</span>
             ועד לחברות הזנק צעירות דוגמת אלה הפועלים בתחום הסייבר המבוקש. כחברת השמה המתמחה בתחום ההייטק, פעילה חברת ג'ובאינפו בהשמת עובדים למשרות 
             <span className='emphasis'>דרושים הייטק</span>
              בתחום התוכנה, על כל תתי התחומים הנכללים בו.
        </p>
        <h3 className='gray-title'> מגוון משרות תוכנה בהייטק</h3>
        <p>
            קשריה ארוכי השנים של חברת ג'ובאינפו עם חברות ההייטק ובכללן חברות
            <span className='emphasis'>התוכנה</span>
            , הן המקומיות והן מרכזי הפיתוח בינלאומיים הפועלים בישראל, הופכים את ג'ובאינפו לנקודת המוצא היעילה ביותר בדרככם אל עבר האתגר והמשרה הבאה שלכם, בין אם
            <span className='emphasis'>כמהנדסי תוכנה, מתכנתים, מפתחי אלגוריתמים</span>
            אנשי שיווק ומכירות ובכל תפקיד אחר בתחום.
            </p>
        <p>
        בפניכם מאגר המשרות הפנויות במקצועות השונים הנכללים בתעשיית התוכנה. במידה ואחת המשרות המופיעות במאגר זה נראית לכם כמתאימה לניסיונכם, השכלתכם וכישוריכם, לאחר תהליך הרשמה קצר תוכלו להעביר את פרטיכם ומסמך קו"ח למומחי ההשמה בחברת ג'ובאינפו.
        </p>
        <div className='positions-list-container'>
         <ul>
             {positionsList.map((position) => <Link to={{
                 pathname:'/search-work',
                 search:`position_name=${position.name}&category=software`,
                 }} >{position.name} <span className='small-letters-container'>({position.count})</span></Link>)}
         </ul> 
     
     </div>
     <Link className='orange-button search-work-button' to='/search-work'>למשרות הייטק נוספות</Link>
    </div>  )
}