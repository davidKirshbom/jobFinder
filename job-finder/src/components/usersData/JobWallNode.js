import Axios from 'axios';
import React, { useEffect, useState,useContext } from 'react'
import SelectPositions from '../usersData/selectPositionsList'
import AreasSelect from '../global/AreasSelect'
import userContext from '../../contexts/UserContext'

import axios from 'axios'
export default ({ end_date,start_date, additional_positions, name, role_name, id, location_area, className, index, type, experience_years,
    qualifications, company_occupation, description, category }) => {
    const [isExtraInfoOpen, setIsExtraInfoOpen] = useState(false)
    const [categoryList, setCategoryList] = useState([]);
    const [formData, setFormData] = useState({})
    const {user}=useContext(userContext)
    useEffect(async () => {
       const categoryList=(await axios.get('http://localhost:3000/utils/get-categorys')).data
        console.log("categoyList", categoryList)
        setCategoryList(categoryList)
    }, [])
    const handleUpdate = async () => {
     
        console.log("formData", formData)
        const updateResult = await axios.put(`http://localhost:3000/jobs/update`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':JSON.stringify('Bearer '+user.token),
               
                     },
            data: JSON.stringify({...formData,id,userEmail:user.data.email })
        })
        
    }
 
    return (
        <div id='jobs-wall-node' className={`list-node-container ${className || ""}`} onClick={() => setIsExtraInfoOpen(true)}>
            <div className={`summary-container ${isExtraInfoOpen ? "yellow-select" : ""}`} >
         
                <div className="data-container">
                    {index !== null ? <span className="index-node">{`${index + 1}.`}</span> : ""}
                    <span className="data-title">תאריך סגירה</span>
                    <span className="end-date-data search-data">{end_date || "open"}</span>
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
            </div>
            <div className={`extra-data-container ${isExtraInfoOpen ? "open" : ""} `}>
                <span className="job-title"><span className=" mobile-only">{role_name}</span><i onClick={(e) => { setIsExtraInfoOpen(false); e.stopPropagation() }} class="fas fa-times close-extra-data"></i></span>
                <div className="dates-container">
                <div className="job-start-date-container">
                   <label>start date:</label> {start_date.slice(0,start_date.indexOf('T'))}
                </div>
              {end_date? <div className="job-end-date-container">
                    <label>end date:</label>{end_date}
                    </div> : ''}
                    </div>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdate() }} id="jobs-form">
                    <div className="job-detail-container">
                        <label htmlFor="name-update-input">name:</label>
                        <input onChange={(e)=>setFormData({...formData,role_name:e.target.value})}  type="text" name="" id="name-update-input" defaultValue={role_name} />
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">description:</label>
                        <textarea onChange={(e)=>setFormData({...formData,description:e.target.value})} type="text" name="" id="" defaultValue={description} />
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">qualifications:</label>
                        <textarea onChange={(e)=>setFormData({...formData,qualifications:e.target.value})} type="text" name="" id="" defaultValue={qualifications} />
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">experience years:</label>
                        <input  onChange={(e)=>setFormData({...formData,experience_years:e.target.value})}  type="number" name="" id="" defaultValue={experience_years} />
                    </div>
                    <div className="job-detail-container">
                        <label htmlFor="">shift type:</label>
                        <input  onChange={(e)=>setFormData({...formData,type:e.target.value})}  type="text" name="" id="" defaultValue={type} />
                    </div>
                    <div className="job-detail-container">
                    <label htmlFor="">location:</label>
                        <AreasSelect
                        // onChange={(e)=>setFormData({...formData,location_area:e.target.value})}
                        userArea={location_area} />
                    </div>
                    <div className="job-detail-container">
                    <label htmlFor="">category:</label>
                        <select defaultValue={category}  onChange={(e)=>setFormData({...formData,category:e.target.value})}>{categoryList.map((value) => <option value={value.map}>{value.name}</option>)}</select>
                        </div>
                    <SelectPositions jobId={id} onChange={(positionsList) => { console.log(positionsList);setFormData({...formData,positions:positionsList}) }} />
                
                    <input type="submit" value="update"/>
                </form>
               
            </div>
        </div>)
}
//}

// qualifications.general.length>0 ? <p><h3>Job qualifications:</h3>
//                             {qualifications.general}</p> : ""
    //
    