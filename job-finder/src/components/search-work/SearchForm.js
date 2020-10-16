import React from 'react'
export default () => {
    
    return (
<div>
    <div className="new-search-open-form-toggle mobile-only">חיפוש חדש<i class="fas fa-angle-down" aria-hidden="true"></i></div>
    <div className="search-form-container">
      <form action="" className="search-form">
        <label for="search-word-input" className="input-label">חפש</label>
        <input type="text" id="search-word-input" />
        <div className="checkbox-container">
            <label className="checkbox-text" htmlFor="senior-checkbox">
                <input className="cheackbox" id="senior-checkbox" type="checkbox" />
                <span htmlFor="senior-checkbox" className="checkmark"></span>
               תפקיד ניהולי
            </label>
        </div>
        
            <div className="radio-btn-group">
                <h2 className="form-subtitle">הראה משרות</h2>
                    <div className="radio-btn-container">
                    <input name="jobs-filter" id="all-jobs-radio-btn" type="radio" />
                    <span className="radiomark"></span>
                    <label htmlFor="all-jobs-radio-btn">כל המשרות</label>
                </div>
                <div className="radio-btn-container">
                    <input name="jobs-filter" id="last-week-jobs-radio-btn" type="radio" />
                    <span className="radiomark"></span>
                    <label htmlFor="last-week-jobs-radio-btn">משרות מהשבוע האחרון</label>
                </div>
            </div>
            <button type="submit" className="big-orange-btn submit-search-btn"><i class="fas fa-search"></i>חפש משרות</button>
      </form>
            </div>
        </div>)
}