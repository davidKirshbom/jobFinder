import React,{useState} from 'react'
import OrangeCheckBox from '../global/OrangeCheckBox'
import  {jobsArea,jobPosition,locations} from '../../data/filtersList'
export default () => {
    const [isMoreAreasExpended, setMoreAreasExpended] = useState(false);
    const [isMoreJobsExpended, setMoreJobsExpended] = useState(false);
    const [isMenuOpen,setMenuOpen]=useState(false)
    return (
        <div className={`filters-menu ${isMenuOpen?"open":""}`}>
            <div onClick={()=>setMenuOpen(!isMenuOpen)} className="open-menu-toggle">
            <i class="fas fa-filter"></i>
            </div>
            <div className="filters-container">
                <h4>סנן לפי</h4>
                <ul>
                    <h5>תחום</h5>
                    {jobsArea.slice(0,isMoreAreasExpended?undefined:10).map(
                        (area)=>(<OrangeCheckBox text={area} id={`${area}-filter-area`} />)
                    )}
                    <div onClick={()=>setMoreAreasExpended(!isMoreAreasExpended)} className="more-fillter-btn">עוד<i class="fas fa-angle-down" aria-hidden="true"></i></div>
                </ul>
                <ul>
                    <h5>תפקיד</h5>
                    {jobPosition.slice(0,isMoreJobsExpended?undefined:10).map(
                        (position)=>(<OrangeCheckBox text={position} id={`${position}-filter-position`} />)
                    )}
                    <div onClick={()=>setMoreJobsExpended(!isMoreJobsExpended)} className="more-fillter-btn">עוד<i class="fas fa-angle-down" aria-hidden="true"></i></div>
                </ul>
                <ul>
                    <h5>אזור</h5>
                    {locations.map(
                        (location)=>(<OrangeCheckBox text={location} id={`${location}-filter-location`} />)
                    )}
                </ul>
                <h5 className="key-words-title">מילות מפתח</h5>
                <input className="key-words-input" type="text"></input>
                <button className="submit-button blue-small-button ">אישור</button>
            </div>
        </div>)
}