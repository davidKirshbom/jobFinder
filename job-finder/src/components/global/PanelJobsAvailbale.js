import React,{useState,useEffect} from "react"
import { totalJobs } from '../../data/jobs'
import axios from 'axios'
export default () => {
    const [jobsCount, setJobsCount] = useState(0)
    useEffect(() => {
        try
       { axios.get('http://localhost:3000/utils/get-jobs-count').then((value) => {
           console.log(value.data[0].count)
           setJobsCount(value.data[0].count)
       }).catch(err=>console.log(err))
        } catch (err) {
            console.log(err)
        }
    },[])
    return (
    
    <div className="panel_total-jobs">
        <div className="total-jobs-text">
            <span className="total-jobs-number">
            <span className="big-splitter splitter"></span>
                {jobsCount}
                </span>
               <span className="total-jobs-subtitle">משרות מחכות לך</span> 
           </div>
    </div>
    )
}