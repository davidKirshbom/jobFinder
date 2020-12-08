
import React, { useEffect, useState,useContext,useRef } from 'react'
import SelectPositions from '../usersData/selectPositionsList'
import AreasSelect from '../global/AreasSelect'
import userContext from '../../contexts/UserContext'
import OrangeCheckBox from '../global/OrangeCheckBox'

import { getAllCategories } from '../../server/utilsDB';
import { insertNewJob, updateJob } from '../../server/jobsDB';
import requestsHandler from '../../server/requestsHandler';
import { removeJob } from '../../server/jobsDB';
export default ({is_managerial_position,isNewJob,hideSummary,isOpen, end_date,start_date, role_name, id, location_area, className, index, type, experience_years,
    qualifications, description, category }) => {
       
    const [isExtraInfoOpen, setIsExtraInfoOpen] = useState(!!isOpen)
    const [categoryList, setCategoryList] = useState([]);
    const [formData, _setFormData] = useState({});
    const [unvalidInputs, setUnvalidInputs] = useState([])
    const formDataRef = useRef(formData)
    const setFormData = data => {
        formDataRef.current = data;
        _setFormData(data)
        console.log("setFormData->data", formData)
    }
    const { user } = useContext(userContext)
    useEffect(()=>{setIsExtraInfoOpen(isOpen)},[isOpen])
    useEffect(
        () => 
        (
            async () => 
            {
                const categoryList = await getAllCategories(); 
            
                setCategoryList(categoryList)
            }
                    
    )()
            
    , [])
    const handleValidForm = () => {
        const inputs = document.getElementById(`jobs-form${id||''}`).children;
        const roleName = inputs[0].children[1].value;
        console.log("handleValidForm -> roleName", roleName)
        const description = inputs[1].children[1].value;
        const qualifications = inputs[2].children[1].value;
        const experienceYears = inputs[3].children[1].value;
        const type = inputs[4].children[1].value;
        const location = inputs[5].children[1].value;
        const category = inputs[6].children[1].value;
        let resultUnvalid=[]
        if (roleName.length === 0)
        resultUnvalid.push('role_name')
        if (description.length === 0)
        resultUnvalid.push('description')
        if (qualifications.length === 0)
        resultUnvalid.push('qualifications')
            if (experienceYears.length === 0)
            resultUnvalid.push ('experienceYears')
        if (type.length === 0)
        resultUnvalid.push ('type') 
        if (!formData.positions || formData.positions.length === 0)
        resultUnvalid.push ('positions') 
        setUnvalidInputs(resultUnvalid)
        console.log("handleValidForm -> resultUnvalid", resultUnvalid)
       return resultUnvalid.length!==0
        
    }
    const handleUpdate = async (end_date) => {
        const isFormValid = !handleValidForm();
        setFormData({...formData,is_managerial_position:document.getElementById(`checkbox-${id||""}`).checked})
        
       
        if(isFormValid||end_date||end_date==='')
        {if (isNewJob)
        {
            formData.location_area = document.getElementById('arear-selection').value;
            formData.category = document.getElementById('category-select').value;
            
            console.log('insert new job')
            const insertResult = await insertNewJob(formData,user)
            console.log("🚀 ~ file: JobWallNode.js ~ line 79 ~ handleUpdate ~ insertResult", insertResult)
        
        }
        else
        {
            const updateResult = await updateJob(id,formData,user,end_date)
            console.log(updateResult)
        }}
    }
    
    const handleJobToggle = (e) => {
        
            e.preventDefault();
        e.stopPropagation();
        if (end_date)
            handleUpdate('NULL')
            else
            handleUpdate(`to_timestamp(${Date.now()} / 1000.0)`)
        
    }
    const handleRemove = async () => {
        const removeResult = await removeJob(id,user)
    }
    return (
        <div id='jobs-wall-node' className={`list-node-container ${className || ""}`} onClick={() => setIsExtraInfoOpen(true)}>
            <div className={`summary-container ${hideSummary?'hide':''} ${isExtraInfoOpen ? "yellow-select" : ""}`} >
         
                <div className="data-container">
                    {index !== null ? <span className="index-node">{`${index + 1}.`}</span> : ""}
                    <span className="data-title">תאריך סגירה</span>
                    <span className="end-date-data search-data">{end_date?end_date.slice(0,end_date.indexOf('T')) : "open"}</span>
                </div>
                <div className="data-container">
                   
                    <span className="data-title">שם</span>
                    <span className="name-data search-data">{role_name || "not supplied"}</span>
                </div>
                <div className="data-container">
                    <span className="data-title">קוד</span>
                    <span className="id-data search-data">{id || "not supplied"}</span>
                </div>
                <div className="data-container">
                    <span className="data-title">מיקום</span>
                    <span className="location_area-data search-data">{location_area || "not supplied"}</span>
                </div>
                <button onClick={handleJobToggle} className="status_toggle">{ end_date?'לפתוח משרה':'לסגור משרה'}</button>
            </div>
            <div className={`extra-data-container ${isExtraInfoOpen ? "open" : ""} `}>
                <span className="job-title"><span className=" mobile-only">{role_name}</span><i onClick={(e) => { setIsExtraInfoOpen(false); e.stopPropagation() }} className="fas fa-times close-extra-data"></i></span>
                <div className="dates-container">
                <div className="job-start-date-container">
                   <label>start date:</label> {start_date?start_date.slice(0,start_date.indexOf('T')):""}
                </div>
              {end_date? <div className="job-end-date-container">
                    <label>end date:</label>{end_date?end_date.slice(0,end_date.indexOf('T')):""}
                    </div> : ''}
                    </div>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate() }} id={`jobs-form${id||''}`}  >
                    <div className="job-detail-container">
                        <label htmlFor="name-update-input">name:</label>
                        <input onChange={(e)=>setFormData({...formData,role_name:e.target.value})}  type="text" name="" id="name-update-input" defaultValue={role_name||""} />
                        <label className="small-letters-container unvalid-label" hidden={!unvalidInputs.includes('role_name')}>חובה להזין שם באנגלית </label>
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">description:</label>
                        <textarea onChange={(e)=>setFormData({...formData,description:e.target.value})} type="text" name="" id="" defaultValue={description||""} />
                        <label className="small-letters-container unvalid-label" hidden={!unvalidInputs.includes('description')}>חובה להזין תיאור באנגלית </label>
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">qualifications:</label>
                        <textarea onChange={(e)=>setFormData({...formData,qualifications:e.target.value})} type="text" name="" id="" defaultValue={qualifications||""} />
                        <label className="small-letters-container unvalid-label" hidden={!unvalidInputs.includes('qualifications')}>חובה להזין תנאי קבלה באנגלית </label>
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">experience years:</label>
                        <input  onChange={(e)=>setFormData({...formData,experience_years:e.target.value})}  type="number" name="" id="" defaultValue={experience_years||""} />
                        <label className="small-letters-container unvalid-label" hidden={!unvalidInputs.includes('experienceYears')}>חובה להזין שנות ניסיון  </label>

                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">shift type:</label>
                        <input  onChange={(e)=>setFormData({...formData,type:e.target.value})}  type="text" name="" id="" defaultValue={type||""} />
                        <label className="small-letters-container unvalid-label" hidden={!unvalidInputs.includes('type')}>חובה להזין סוג משמרת באנגלית </label>

                    </div>
                    <div className="job-detail-container">
                    <label htmlFor="">location:</label>
                        <AreasSelect
                        // onChange={(e)=>setFormData({...formData,location_area:e.target.value})}
                        userArea={location_area||'hasharon'} />
                        
                    </div>
                    <div className="job-detail-container">
                    <label htmlFor="">category:</label>
                        <select id='category-select' defaultValue={category || 0} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>{categoryList.map((value) => <option value={value.id}>{value.name}</option>)}</select>          
                    </div>
                    <SelectPositions jobId={id} onChange={(positionsList) => { setFormData({...formData,positions:positionsList}) }} />
                    <label className="small-letters-container unvalid-label" hidden={!unvalidInputs.includes('positions')}>חובה להכניס לפחות תפקיד אחד </label>
                    <OrangeCheckBox id={`checkbox-${id||""}`} text="is managerial position?" checked={is_managerial_position}/>
                    <input className="submit-button" type="submit" value='שמור' />
                </form>
               {isNewJob?"":<button onClick={()=>handleRemove()}  className="remove-button">מחק</button>}
            </div>
        </div>)
}
//}

// qualifications.general.length>0 ? <p><h3>Job qualifications:</h3>
//                             {qualifications.general}</p> : ""
    //
    