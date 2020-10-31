import  { useState, useEffect,useRef } from 'react'
import React from 'react'
import validator from 'validator'
import OrangeCheckBox from '../global/OrangeCheckBox'
import axios from 'axios'
import FilterCompaniesList from './filterCompaniesList'


export default () => {
   
    const [unValidFields, setUnValidFields] = useState([])
    const [cvFile, setCvFile] = useState();
    const [companiesSendCv, setCompaniesSendCV] = useState([]);
    const cvFileInputRef = useRef(null);
    const maxLattersTextArea = 300;
    // const formFields=document.getElementById('registar-form').children
    
    const handleFormValidation = (formObj) => {
        let result=false
        let unvalueFields = []
        if (!formObj.first_name||!validator.isAlpha(formObj.first_name,'en-US'))
        {
            unvalueFields.push('first_name');
            result = true;
        }
        if (!formObj.last_name||!validator.isAlpha(formObj.last_name,'en-US'))
        {
            unvalueFields.push('last_name');
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
        // console.log(formObj.cv.name)
        if (!formObj.cv||(!formObj.cv.name.includes('.pdf')&&!formObj.cv.name.includes('.doc')&&!formObj.cv.name.includes('.docx')))
        {
            unvalueFields.push('cv');
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
        const bottomsInputs = formInputs[5].firstChild.children;
    console.log(formInputs)
        result.first_name = formInputs[0].firstChild.value;
        result.last_name = formInputs[1].firstChild.value;
        result.phone_number = formInputs[2].firstChild.value;
        result.password = formInputs[3].firstChild.value;
        result.email = formInputs[4].firstChild.value;
    
        result.email_subscribe = formInputs[7].firstChild.firstChild.checked;
        result.send_auto_cv = formInputs[8].firstChild.firstChild.checked;
        result.cv = formInputs[5].firstChild.children[1].files[0];
        console.log(result)
        if(!handleFormValidation(result))
        try {
            axios.post('http://localhost:3000/users/registar/users', {
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
            <div id="search-work-register">
                <div className="page-title">שליחת קורות חיים</div>
                <div className="service-pros-container">
                    <span className="service-pro">
                    <span className="v-symbol"></span>
                        הגדרת סוכן חכם
                             
                    </span>
                    <span className="service-pro">
                    <span className="v-symbol"></span>
                        יומן ניהול משרות
                             
                    </span>
                    <span className="service-pro">
                    <span className="v-symbol"></span>
                        שמירה של חיפושים מתקדמים
                            
                    </span>
                    <span className="service-pro">
                    <span className="v-symbol"></span>
                        קבלת משרות רלוונטיות למייל
                        
                    </span>
                </div>
                <div className="form-register-container">
                    <h5>ההתקדמות שלכם בעולם ההייטק! שלחו קורות חיים</h5>
                    <form onSubmit={Registar} id="registar-form" >
                        <div className="input-container">
                        <input className="first-name-input" type="text" placeholder="*שם פרטי(באנגלית)" ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('first_name')}>חובה להזין שם באנגלית </label>
                        </div>
                        <div className="input-container">
                        <input type="text" placeholder="*שם משפחה(באנגלית)" ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('last_name')}>חובה להזין שם באנגלית </label>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="*טלפון"  ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('phoneNumber')}>חובה להזין מספר טלפון חוקי </label>
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="*סיסמא" maxLength='8' ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('password')}>חובה להזין סיסמא בעלת 8 תווים </label>
                        </div>
                        <div className="input-container">
                            <input type="email" placeholder="*דואר אלקטרוני" ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('email')}>חובה להזין איימיל חוקי </label>
                        </div>
                        <div className="input-container">
                        <div className="form-bottom-section">
                        <label className="gray-letters">טען קובץ קורות חיים</label>
                        <input
                            hidden={true}
                            id="cv-file-input"
                            ref={cvFileInputRef}
                            onChange={(e)=>{setCvFile(e.target.files[0])}}
                            type="file"
                            title="בחר קובץ"
                            accept=".doc,.pdf,.docx"
                        ></input>
                        <label className="file-input-btn" for="cv-file-input">בחר קובץ </label>
                        {cvFile ? <label className="cv-name gray-letters small-letters-container">{cvFile.name} <br/></label> : ""}
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('cv')}>חובה להעלות קובץ חוקי<br/></label>
                        </div>
                                <label className="files-rules gray-letters small-letters-container">מסמך doc,docx,pdf </label>
                        </div>
                        <FilterCompaniesList
                                onChange={(companiesList)=>setCompaniesSendCV(companiesList)}
                            />
                           
                        <OrangeCheckBox
                            text='מאשר/ת קבלת מידע בנושא קריירה ותעסוקה ב- newsletter, מייל ו/או SMS (על חשבון Jobinfo) ובלבד שניתנת לי האפשרות להודיע בכל עת שלא לשלוח לי מידע נוסף.'
                            value='subscribe-mail'
                            id='subscribe-mail-checkbox' />
                            <OrangeCheckBox
                            text="אני מאשר/ת ליועצת ההשמה לשלוח את קורות החיים שלי לחברות ולמשרות ההולמות את כישוריי על פי שיקול דעתו."
                            value='subscribe-mail'
                            id='subscribe-mail-checkbox' />
                          
                            <div className="small-letters-container">*שדה חובה</div>
                            <input className="registar-button" type="submit" value="שלח קורות חיים" />
                           
                    </form>
                </div>
                <p className="page-explain">
                שליחת קורות חיים ל Jobinfo מתבצעת בתהליך פשוט וקל הדורש רישום וטעינת קורות חיים חד פעמית.
                לאחר בחירת תפקידים המתאימים לפרופיל שלכם, שליחת קורות החיים נעשית בהפניה אוטומטית אל יועצת ההשמה המנהלת את המשרות.<br/>
                אנו ממליצים על הגדרת סוכן חכם, המודיע על פרסום משרות חדשות, דבר אשר יגביר את סיכוי שליחת קורות החיים ומציאת עבודה מתאימה. 
                                    </p>
            </div>
        )
    
}
 