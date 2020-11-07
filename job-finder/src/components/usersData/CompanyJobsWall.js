import React from 'react'
import { useEffect,useState, useContext } from 'react';
import userContext from '../../contexts/UserContext'
import ResultList from '../search-work/ResultList'
import JobWallNode from '../usersData/JobWallNode'
import axios from 'axios';
export default () => {
    const [resultOffset,setResultOffset]=useState(0);
    const [jobsList, setJobsList] = useState({rows:[],total:0});
    const [activeFilters, setActiveFilters] = useState({});
    const [sortBy,setSortBy]=useState({isAscending:true})
    const {user,setUser}=useContext(userContext)
    useEffect(()=>{},[])
    useEffect(async () => {
        console.log("useEffect user", user)
        try {
          const queryResult=await  axios.get(`http://localhost:3000/users/company-job-wall/${user.data.email}/${user.data.uuid}`, {
            headers: {
              'Authorization' :user.token, 
            },
           
          })
            console.log("queryResult.data", queryResult.data)
            setJobsList({rows:queryResult.data,totla:50});
            
      } catch (err) {
          console.log(err)
        }
    },[resultOffset,sortBy])
    
    return (<div>
        <ResultList
            sortObj={sortBy}
            setSort={setSortBy}
            resultOffset={resultOffset}
            setResultOffset={setResultOffset}
            totalResults={jobsList.total}
            jobsList={jobsList.rows}
            NodeComponent={JobWallNode}></ResultList>
    </div>)
}
 