import React,{useState} from 'react'
import OrangeCheckBox from '../global/OrangeCheckBox'
import {locationsAreas,occupations} from './dictionaty'
import  {jobsArea,jobPosition,locations} from '../../data/filtersList'
export default (props) => {
   
    const organizeFillterObj = (e) => {
        const result = {};
        const jobType = document.getElementById("job-type_checkboxs")
       
        result.type = "";
        for (let index = 1; index < jobType.children.length-1; index++){
            const checkbox = jobType.children[index].firstChild.firstChild;
            if (checkbox.checked)
                result.type += `'${occupations.get(checkbox.value)}',`;
            
        }
        const position = document.getElementById("positions_checkbox")
        result.positions = "";
        for (let index = 1; index < position.children.length-1; index++){
            const checkbox = position.children[index].firstChild.firstChild;
            if (checkbox.checked)
                result.positions += `'${checkbox.value}',`;
            
        }
        const locations = document.getElementById("location_checkbox")
        result.location_area = "";
        for (let index = 1; index < locations.children.length-1; index++){
            const checkbox = locations.children[index].firstChild.firstChild;
            if (checkbox.checked)
                result.location_area +=`'${locationsAreas.get(checkbox.value)}',`;
           
        }
        result.type = result.type.slice(0, -1);
        result.positions = result.positions.slice(0, -1);
        result.location_area = result.location_area.slice(0,-1);
        return result;

       
    }
    const [isMoreAreasExpended, setMoreAreasExpended] = useState(false);
    const [isMoreJobsExpended, setMoreJobsExpended] = useState(false);
    const [isMenuOpen,setMenuOpen]=useState(false)
    return (
        <div className={`filters-menu ${isMenuOpen?"open":""}`}>
            <div onClick={()=>setMenuOpen(!isMenuOpen)} className="open-menu-toggle">
            <i className="fas fa-filter"></i>
            </div>
            <div className="filters-container">
                <h4>סנן לפי</h4>
                <ul id="job-type_checkboxs">
                    <h5>תחום</h5>
                    {jobsArea.slice(0,isMoreAreasExpended?undefined:10).map(
                        (area) => (<OrangeCheckBox text={area} value={area} id={`${area}-filter-area`} />)
                    )}
                    <div onClick={()=>setMoreAreasExpended(!isMoreAreasExpended)} className="more-fillter-btn">עוד<i className="fas fa-angle-down" aria-hidden="true"></i></div>
                </ul>
                <ul id="positions_checkbox">
                    <h5>תפקיד</h5>
                    {jobPosition.slice(0,isMoreJobsExpended?undefined:10).map(
                        (position)=>(<OrangeCheckBox text={position} value={position} id={`${position}-filter-position`} />)
                    )}
                    <div onClick={()=>setMoreJobsExpended(!isMoreJobsExpended)} className="more-fillter-btn">עוד<i className="fas fa-angle-down" aria-hidden="true"></i></div>
                </ul>
                <ul id="location_checkbox">
                    <h5>אזור</h5>
                    {locations.map(
                        (location)=>(<OrangeCheckBox text={location} value={location} id={`${location}-filter-location`} />)
                    )}
                </ul>
                <h5 className="key-words-title">מילות מפתח</h5>
                <input className="key-words-input" type="text"></input>
                <button onClick={(e)=>{props.filterHandler(organizeFillterObj())}} className="submit-button blue-small-button ">אישור</button>
            </div>
        </div>)
}