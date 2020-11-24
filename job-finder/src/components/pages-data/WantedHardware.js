import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import history from '../../router/history'
export default () => {
    const [positionsList, setPositionsList] = useState([])
    useEffect(() => {
         axios.get('http://localhost:3000/utils/jobs-by-category?categoryId=1').then(
                (result)=>setPositionsList(result.data.data)
            )
            
        
       
    }, [])
 return   (<div className='wanted-page'>
        <h2>דרושים חומרה</h2>
        <p>
        תחומי האלקטרוניקה וחשמל, ציוד התקשורת והשבבים נחשבו לגולת הכותרת של ההייטק הישראלי ושגשגו בעיקר סביב התעשיות הביטחוניות, שרתי אחסון מידע ותעשיית התקשורת והדפוס.
        בשנים האחרונות עולם החומרה עבר טלטלות בעקבות התייקרות עלויות ייצור, ירידה משמעותית בהשקעות ומעבר לטכנולוגיות ענן ו- wifi, שעודדו חברות להעביר את כל שניתן מחומרה לתוכנה. השוק כיום מתרכז בשחקניות גדולות ומעט חברות הזנק חדשות בתחום החומרה נפתחות מידי שנה.
        </p>
        <h3 className='gray-title'> מגוון משרות תוכנה בהייטק</h3>
     <p>
     הצעות ותפקידים למהנדסי חשמל ואלקטרוניקה, מפתחי אלגוריתמים ומפתחי חומרה ברמות שונות של המוצר פתוחות כיום במגוון תחומי חומרה חדשניים: הסלולר, החלל, המכשור הרפואי, IoT ועוד.<br/>
     חברות בינלאומיות המודעות לפוטנציאל הרב בידע וביכולות הפיתוח של טכנולוגיות חומרה ותקשורת עבור הדור הבא של המוצרים שלהן פתחו בשנים האחרונות מרכזי פיתוח בישראל ומגייסות במרץ מהנדסים ומפתחים בעלי ניסיון ובוגרי אוניברסיטאות.
            </p>
        <p>
         פעילותה של חברת ג'ובאינפו בתחום השמת עובדים
        <span className='emphasis'>והשמת עובדים </span>  
        נפרסת על כלל תחומי הפעילות בעולם ההייטק ובכלל זה גם תחום החומרה. לפניכם מאגר המשרות הפנויות בתחום החומרה. במידה ואתם מחפשים משרה ואתגר מקצועי חדש בתחום החומרה, עיינו ברשימת המשרות ופנו אלינו בנוגע למשרות הרלוונטיות לכם.
         </p>
        <div className='positions-list-container'>
         <ul>
             {positionsList.map((position) => <Link to={{
                 pathname:'/search-work',
                 search:`position_name=${position.name}&category=hardware`,
                 }} >{position.name} <span className='small-letters-container'>({position.count})</span></Link>)}
         </ul> 
     
     </div>
     <Link className='orange-button search-work-button' to='/search-work'>למשרות הייטק נוספות</Link>
    </div>  )
}