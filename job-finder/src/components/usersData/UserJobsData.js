import React, { useState, useContext, useEffect } from 'react'

import userContext from '../../contexts/UserContext'
import ResultList from '../search-work/ResultList'
import ResultListNode from '../search-work/ResultListNode'
import {getSavedJobs, getSendedUserJobs}from '../../server/usersDB'
export default () => {
    const [isSavedJobsTabSelected, setIsSavedJobsTabSelected] = useState(true)
    const [resultOffset,setResultOffset]=useState(0);
    const [jobsList, setJobsList] = useState({rows:[],total:0});
    const [sortBy,setSortBy]=useState({isAscending:true})
    const { user, setUser } = useContext(userContext)
    const updateSavedUserJobs =async  (userId,token) => {
        return (await getSavedJobs(userId,token))

    }
    const updateSendedUserJobs = async (userId,token) => {
        return (await getSendedUserJobs(userId,token))
     
    }
    useEffect(() =>
    {
        if(isSavedJobsTabSelected)
        updateSavedUserJobs(user.data.uid, user.token).then((value) => {setJobsList({rows:value})})
        else
        updateSendedUserJobs(user.data.uid, user.token).then((value) => { setJobsList({ rows: value }) })
    }, [isSavedJobsTabSelected])
    

    const getUsersSavedChart = () => {
       return (<ResultList
        sortObj={sortBy}
        setSort={setSortBy}
        resultOffset={resultOffset}
        setResultOffset={setResultOffset}
        totalResults={jobsList.total}
        jobsList={jobsList.rows}
        NodeComponent={ResultListNode}></ResultList>)
    }
    
    return (
        <div>
            <div className="chart-tabs container-flex-row">
                <div onClick={()=>setIsSavedJobsTabSelected(true)} className="tab">המשרות ששמרתי</div>
                <div onClick={()=>setIsSavedJobsTabSelected(false)} className='tab'>המשרות ששלחתי</div>
            </div>
            {
                <ResultList
        sortObj={sortBy}
        setSort={setSortBy}
        resultOffset={resultOffset}
        setResultOffset={setResultOffset}
        totalResults={jobsList.total}
        jobsList={jobsList.rows}
        NodeComponent={ResultListNode}></ResultList>
            }
        </div>
    )
}