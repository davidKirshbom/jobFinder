import React,{useState,useEffect} from "react"
import { getTotalJobs } from "../../server/jobsDB"
export default () => {
    const [jobsCount, setJobsCount] = useState(0)
    useEffect(() => {
        try
       { 
        getTotalJobs().then((value)=>setJobsCount(value))
            
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