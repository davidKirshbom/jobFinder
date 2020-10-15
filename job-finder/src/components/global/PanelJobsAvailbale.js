import React from "react"
import {totalJobs} from '../../data/jobs'
export default () => {
    return (
    
    <div className="panel_total-jobs">
        <div className="total-jobs-text">
            <span className="total-jobs-number">
            <span className="big-splitter splitter"></span>
                {totalJobs}
                </span>
               <span className="total-jobs-subtitle">משרות מחכות לך</span> 
           </div>
    </div>
    )
}