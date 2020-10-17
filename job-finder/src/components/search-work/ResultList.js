import React from 'react'
import ListNode from './ResultListNode'
import {jobsList} from '../../data/jobs'
export default () => {
    return (

        <div className="result-list-container">
            <div className="result-list-title-row desktop-only">
                <i class="fas fa-sort sort-results-icon"></i>
                <div className="list-title-name result-title-item">שם <i class="fas fa-sort  sort-results-icon"></i></div>
                <div className="list-title-code result-title-item">קוד </div>
                <div className="list-title-location result-title-item">מיקום <i class="fas fa-sort sort-results-icon"></i></div>
            </div>
            {
                jobsList.map((job,index)=>(<ListNode  className={index%2===0?"gray-bg":"white-bg"} {...job} index={index}/>))
            }
            
            
        </div>
    )
}