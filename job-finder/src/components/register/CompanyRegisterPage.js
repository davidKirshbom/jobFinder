import { useState, useContext } from 'react'
import React from 'react'
import validator from 'validator'
import OrangeCheckBox from '../global/OrangeCheckBox'
import userContext from '../../contexts/UserContext'
import AreasSelect from '../global/AreasSelect'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ResultModal from '../global/ResultModal'

const Comp = () => {
    const history = useHistory();
    const [textAreaLettersCount, setTextAreaLettersCount] = useState(0);
    const [unValidFields, setUnValidFields] = useState([])
    const { user, setUser } = useContext(userContext);
    const [registarResult,setRegistarResult]=useState({isSendRegister:false,isSuccess:false})
    const maxLattersTextArea = 300;
    // const formFields=document.getElementById('registar-form').children
    const handleFormValidation = (formObj) => {
        let result=false
        let unvalueFields = []
        if (!formObj.name||!validator.isAlpha(formObj.name,'en-US'))
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

        if ((user.data&&(formObj.password.length!==0&&formObj.password.length!==8))||(!user.data&&formObj.password.length !== 8))
        {
            unvalueFields.push('password');
            result = true;
        }
        setUnValidFields(unvalueFields)
        console.log("handleFormValidation -> unvalueFields", unvalueFields)
        return result;
    }
    const updateUserData = (e) => {
        e.preventDefault()
        console.log(user)
        const result = {};
        const formInputs = e.target.children;
        result.name = formInputs[0].value;
        result.phone_number = formInputs[2].value;
        result.email = formInputs[4].value;
        result.password = formInputs[6].value;
        result.area_location = formInputs[8].value;
        result.category = formInputs[9].value;
        result.uid = user.data.uuid;
        result.clientType='company'
        
        if (!handleFormValidation(result))
        {
            console.log("updateUserData -> user.token", user.token)
        try {
            axios.put('http://localhost:3000/users/update', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':JSON.stringify('Bearer '+user.token),
                   
                         },
                data: JSON.stringify(result)
            }).then(() => {
                try
                {
                    axios.get(`http://localhost:3000/users/get-user/${result.uid}/company`).then((value) => {
                        setUser({ data: value.data.rows[0], token: user.token })
                    console.log("updateUserData -> value", value)
                    })
                }
                catch (err) {
                    throw new Error("cant get new user")
                }
            })
        }
        catch (err) {
            console.log(err)
            }}
    }
 
    const Registar = (e) => {
        e.preventDefault()
        const result = {};
        const formInputs = e.target.children;
        console.log("Registar -> formInputs", formInputs)
        result.name = formInputs[0].firstChild.value;
        result.phone_number = formInputs[1].children[0].value;
        result.email = formInputs[2].children[0].value;
        result.password = formInputs[3].children[0].value;
        result.area_location = formInputs[4].value;
        result.category = formInputs[5].value;
        console.log("Registar -> result", result)
        
        if(!handleFormValidation(result))
        try {
            axios.post('http://localhost:3000/users/registar/company', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(result)
            }).then((value) => {
                console.log("🚀 ~ file: CompanyRegisterPage.js ~ line 122 ~ Registar ~ value", value)
                setUser(value.data)
                history.push({
                    pathname:'/',
                    search:'?message_open=true&send_success=true'
                })
            }).catch(err => {
                console.log(err);
                history.push({
                    pathname:'/',
                    search:'?message_open=true&send_success=false'
                })
            })
        }
        catch (err) {
            setRegistarResult({isSendRegister:true,isSuccess:false})
            console.log(err)
            }
        
    }
   
        return (
            <div>
                <div className="page-title">הוספת חברה</div>
                <div className="form-register-container">
                    <h5>מציאת עובדים בכל הארץ! מלאו פרטים והצטרפו למשפחת ג'ובאינפו</h5>
                    <form onSubmit={user.data?updateUserData:Registar} id="registar-form" >
                        <div className='input-container'>
                        <input
                            type="text"
                            placeholder="*שם (באנגלית)"
                            defaultValue={user.data?user.data.name:""}></input>
                        <label className="small-letters-container unvalid-label"
                            hidden={!unValidFields.includes('name')}
                            >חובה להזין שם באנגלית </label>
                        </div>
                        <div className='input-container'>
                        <input  type="text" placeholder="*טלפון" defaultValue={user.data?user.data.phone_number:""}  ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('phoneNumber')}>חובה להזין מספר טלפון חוקי </label>
                        </div>
                        <div className='input-container'>
                            <input type="text" placeholder="*דואר אלקטרוני" defaultValue={user.data ? user.data.email : ""} ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('email')}>חובה להזין איימיל חוקי </label>
                        </div>
                        <div className='input-container'>
                            <input type="password" placeholder="*סיסמא" maxLength='8'  ></input>
                        <label className="small-letters-container unvalid-label" hidden={!unValidFields.includes('password')}>חובה להזין סיסמא בעלת 8 תווים </label>
                        </div>
                            <AreasSelect userArea={user.data ? user.data.location_area : undefined}></AreasSelect>
                    
                        <textarea
                            className="input-text-area"
                            type="text"
                            placeholder="*מה עושה החברה?"
                            maxLength={maxLattersTextArea}
                            onChange={(e) => setTextAreaLettersCount(e.target.value.length)}
                            defaultValue={user.data?user.data.category:""}
                        ></textarea>
                        <div className='letters-counter'>{textAreaLettersCount}/{maxLattersTextArea}</div>
                        <OrangeCheckBox
                            text='מאשר/ת קבלת מידע בנושא קריירה ותעסוקה ב- newsletter, מייל ו/או SMS (על חשבון Jobinfo) ובלבד שניתנת לי האפשרות להודיע בכל עת שלא לשלוח לי מידע נוסף.'
                            value='subscribe-mail'
                            id='subscribe-mail-checkbox' />
                        <div className="small-letters-container">*שדה חובה</div>
                        <input className="registar-button" type="submit" value={user.data?'עדכן':'הירשם'} />
                    </form>
                </div>
            </div>
        )
    
}
export default Comp 