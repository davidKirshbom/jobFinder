import  { useState, useEffect } from 'react'
import React from 'react'
import validator from 'validator'
import OrangeCheckBox from '../global/OrangeCheckBox'
import axios from 'axios'


const Comp= () => {
    const [textAreaLettersCount, setTextAreaLettersCount] = useState(0);
    const [unValidFields,setUnValidFields]=useState([])
    const maxLattersTextArea = 300;
    // const formFields=document.getElementById('registar-form').children
    const handleFormValidation = (formObj) => {
        let result=false
        let unvalueFields = []
        if (!formObj.name||validator.isAlpha(formObj.name,'en-US'))
        {
            unvalueFields.push('name');
            result = true;
        }
        if (!formObj.phone_number||! (/^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(formObj.phone_number)))
        {
            unvalueFields.push('phoneNumber');
            result = true;
        }
        if (!formObj.email||(!validator.isEmail(formObj.email)))
        {
        
            unvalueFields.push('email');
            result = true;
            }
          
        if (!formObj.password||formObj.password.length !== 8)
        {
            unvalueFields.push('password');
            result = true;
        }
        setUnValidFields(unvalueFields)
        return result;
    }
    useEffect(()=>{console.log(unValidFields)},[unValidFields])
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
        if(!handleFormValidation(result))
        try {
            axios.post('http://localhost:3000/users/registar/company', {
                headers: {
                            'Content-Type': 'application/json',
                         },
                data: JSON.stringify(result)
            })
        }
        catch (err) {
            console.log(err)
            }
        
    }
   
        return (
            <div>
                <div className="page-title">הוספת חברה</div>
                <div className="form-register-container">
                    <h5>מציאת עובדים בכל הארץ! מלאו פרטים והצטרפו למשפחת ג'ובאינפו</h5>
                    <form onSubmit={Registar} id="registar-form" >
                        <input type="text" placeholder="*שם (באנגלית)" ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('name')}>חובה להזין שם באנגלית </label>
                        <input  type="text" placeholder="*טלפון"  ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('phoneNumber')}>חובה להזין מספר טלפון חוקי </label>
                        <input  type="email" placeholder="*דואר אלקטרוני" ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('email')}>חובה להזין איימיל חוקי </label>
                        <input  type="password" placeholder="*סיסמא" maxLength='8' ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('email')}>חובה להזין סיסמא בעלת 8 תווים </label>
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
export default Comp 