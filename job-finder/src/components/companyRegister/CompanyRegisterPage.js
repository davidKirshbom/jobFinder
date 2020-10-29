import React,{useState} from 'react'
import OrangeCheckBox from '../global/OrangeCheckBox'
import axios from 'axios'

export default () => {
    
    const [textAreaLettersCount, setTextAreaLettersCount] = useState(0);
    const maxLattersTextArea = 300
    const Registar = (e) => {
        e.preventDefault()
        const result = {};
        const formInputs = e.target.children;
        result.name = formInputs[0].value;
        result.phone_number = formInputs[1].value;
        result.email = formInputs[2].value;
        result.password = formInputs[3].value;
        result.area_location = formInputs[4].value;
        result.category = formInputs[5].value;
        try {
            axios.post('http://localhost:3000/users/registar/company', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(result)
            })
        } catch (err) {
            
        }
    }
    
        return (
            <div>
                <div className="page-title">הוספת חברה</div>
                <div className="form-register-container">
                    <h5>מציאת עובדים בכל הארץ! מלאו פרטים והצטרפו למשפחת ג'ובאינפו</h5>
                    <form onSubmit={Registar} id="registar-form" >
                        <input type="text" placeholder="*שם (באנגלית)" required></input>
                        <input type="text" placeholder="*טלפון" required></input>
                        <input type="email" placeholder="*דואר אלקטרוני" required></input>
                        <input type="password" placeholder="*סיסמא" maxLength='8' required></input>
                        <select id="arear-selection" className="area-select">
                            <option value="Tel_Aviv">תל אביב-יפו</option>
                            <option value="south">אזור הדרום</option>
                            <option value="Tel-Aviv,">אזור המרכז</option>
                            <option value="north">אזור הצפון</option>
                            <option value="hasharon">אזור צפון השרון</option>
                            <option value="europe,USA,">חוץ לארץ</option>
                            <option value="europe">Europe</option>
                            <option value="far east">Far East</option>
                            <option value="USA">United States</option>
                            <option selected="true" value="all_areas">כל האזורים</option>
                        </select>
                    
                        <textarea
                            className="input-text-area"
                            type="text"
                            placeholder="*מה עושה החברה?"
                            maxLength={maxLattersTextArea}
                            onChange={(e) => setTextAreaLettersCount(e.target.value.length)}
                        ></textarea>
                        <div className='letters-counter'>{textAreaLettersCount}/{maxLattersTextArea}</div>
                        <OrangeCheckBox
                            text='מאשר/ת קבלת מידע בנושא קריירה ותעסוקה ב- newsletter, מייל ו/או SMS (על חשבון Jobinfo) ובלבד שניתנת לי האפשרות להודיע בכל עת שלא לשלוח לי מידע נוסף.'
                            value='subscribe-mail'
                            id='subscribe-mail-checkbox' />
                        <div className="small-letters-container">*שדה חובה</div>
                        <input className="registar-button" type="submit" value="הירשם" />
                    </form>
                </div>
    
            </div>
        )
    
}