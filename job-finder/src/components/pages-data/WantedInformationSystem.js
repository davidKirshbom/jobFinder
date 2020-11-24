import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import history from '../../router/history'
export default () => {
    const [positionsList, setPositionsList] = useState([])
    useEffect(() => {
         axios.get('http://localhost:3000/utils/jobs-by-category?categoryId=4').then(
                (result)=>setPositionsList(result.data.data)
            )
            
        
       
    }, [])
 return   (<div className='wanted-page'>
        <h2>דרושים למשרות מהנדס מערכות מידע </h2>
        <p>
        תחום
        <span className='emphasis'>מערכות מידע</span> 
        הוא אחד התחומים אשר הביקוש לאנשי המקצוע בו התפתח באופן משמעותי בשנים האחרונות בתעשיית ההייטק הישראלית.
     </p>
     <p>
         הצורך בידע ויכולת לניהול ופיתוח מסדי נתונים ענקיים, יחד עם יכולות איסוף המידע ובעיקר היכולת לנתח את אותם נתונים ולהסיק מהם מסקנות לפעילות העתידית של החברות השונות, הפכו את התחום לקריטי בתעשייה. חברת ג'ובאינפו היא אחת מחברות ההשמה המובילות בהשמת עובדים למשרות
          <span>דרושים הייטק</span>  
          ומשרות בכירים בתעשיית ההייטק הישראלית, ועוסקת גם בהשמת עובדים ובכירים בתחום מערכות המידע.
     </p>
        <h3 className='gray-title'> דרושים מערכות מידע</h3>
     <p>
         לפניכם מאגר המשרות הפנויות בתחום זה, החל ממשרות האפיון והפיתוח הטכנולוגי של מערכות מידע, דרך מנהלי מערכות מידע העוסקים בתפעול המערכות ובהתאמתן לצרכיו הייחודיים של הארגון, ועד לתפקידים העוסקים בניהול בסיסי הנתונים,
              <span className='emphasis'>מהנדסי מערכות מידע</span> 
              , אנשי שיווק ואנליסטים העוסקים בניתוח המידע עבור הארגונים.
         </p>

        <p>
        במידה ואחת המשרות המוצגות בעמוד זה נמצאה על ידכם כמתאימה להשכלתכם, ניסיונכם וכישוריכם, לאחר תהליך הרשמה קצר תוכלו להעביר דרך האתר את פרטיכם למומחי ההשמה של חברת ג'ובאינפו המתמחים בתחום זה.     </p>
        <div className='positions-list-container'>
         <ul>
             {positionsList.map((position) => <Link to={{
                 pathname:'/search-work',
                 search:`position_name=${position.name}&category=information system`,
                 }} >{position.name} <span className='small-letters-container'>({position.count})</span></Link>)}
         </ul> 
     
     </div>
     <Link className='orange-button search-work-button' to='/search-work'>למשרות הייטק נוספות</Link>
    </div>  )
}