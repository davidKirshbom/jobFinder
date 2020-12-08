import React from 'react'
import { useEffect,useState, useContext } from 'react';
import userContext from '../../contexts/UserContext'
import ResultList from '../search-work/ResultList'
import JobWallNode from '../usersData/JobWallNode'

import { getCompanyJobs } from '../../server/usersDB';
export default () => {
    const [resultOffset,setResultOffset]=useState(0);
    const [jobsList, setJobsList] = useState({rows:[],total:0});
  const [activeFilters, setActiveFilters] = useState({});
  const [isNewJobFormOpen, setIsNewJobFormOpen] = useState(false);
    const [sortBy,setSortBy]=useState({isAscending:true})
    const {user,setUser}=useContext(userContext)
 
  useEffect(
    
    ()=>(async () => {
        console.log("useEffect user", user)
        try {
          const queryResult = await getCompanyJobs(user)
          console.log("🚀 ~ file: CompanyJobsWall.js ~ line 22 ~ queryResult", queryResult)
          
            setJobsList({rows:queryResult,total:50});
            
      } catch (err) {
          console.log(err)
        }
    })(),[resultOffset,sortBy])
    
    return (<div>
        <ResultList
            sortObj={sortBy}
            setSort={setSortBy}
            resultOffset={resultOffset}
            setResultOffset={setResultOffset}
            totalResults={jobsList.total}
            jobsList={jobsList.rows}
        NodeComponent={JobWallNode}></ResultList>
      <button onClickCapture={(e)=>setIsNewJobFormOpen(true)} className="add-job-button ">הוסף חדש</button>
      <div className='add-job-modal open'>
        <JobWallNode isNewJob={true} isOpen={isNewJobFormOpen} hideSummary={true}/>
      </div>
    </div>)
}
 