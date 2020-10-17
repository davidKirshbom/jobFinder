import React from 'react'
import OrangeCheckBox from '../global/OrangeCheckBox'

export default ({ name,code,location,className,index }) => {
    console.log(index)
    return (
        <div className={`list-node-container ${className||""}`}>
            <div className="summary-container">
         
                <OrangeCheckBox id={"checkbox-code-"+code} />
                <div className="data-container">
                    {index!==null?<span className="index-node">{`${index+1}.`}</span>:""}
                    <span className="data-title">שם</span>
                    <span className="name-data search-data">{name || "not supplied"}</span>
                </div>
                <div className="data-container">
                    <span className="data-title">קוד</span>
                    <span className="code-data search-data">{code || "not supplied"}</span>
                </div>
                <div className="data-container">
                    <span className="data-title">מיקום</span>
                    <span className="location-data search-data">{location || "not supplied"}</span>
                </div>
            </div>
            <i aria-hidden="true" class="fas fa-angle-left"></i>
    </div>)
}