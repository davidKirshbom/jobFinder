import React from 'react'

import OrangeCheckBox from '../global/OrangeCheckBox'
export default (props) => {
    
    return (
<div >
    <div className="new-search-open-form-toggle mobile-only">חיפוש חדש<i className="fas fa-angle-down" aria-hidden="true"></i></div>
    <div className="search-form-container">
      <form id="new-search-form" onSubmit={props.handleSearch}  className="search-form">
        <label for="search-word-input" className="input-label">חפש</label>
        <input type="text" id="search-word-input" />
        <OrangeCheckBox id="senior-checkbox" text="תפקיד ניהולי"/>
        
            <div className="radio-btn-group">
                <h2 className="form-subtitle">הראה משרות</h2>
                    <div className="radio-btn-container">
                    <input  name="jobs-filter" id="all-jobs-radio-btn" value="all" type="radio" />
                    <span className="radiomark "></span>
                    <label htmlFor="all-jobs-radio-btn">כל המשרות</label>
                </div>
                <div className="radio-btn-container">
                    <input  name="jobs-filter" id="last-week-jobs-radio-btn" value="last_week" type="radio" />
                    <span className="radiomark"></span>
                    <label htmlFor="last-week-jobs-radio-btn">משרות מהשבוע האחרון</label>
                </div>
                    </div>
                    <div className="input-container">
            <input type="submit" className="big-orange-btn submit-search-btn" value="חפש משרות"></input><i className="fas fa-search"></i>
            </div>
            </form>
            </div>
        </div>)
}