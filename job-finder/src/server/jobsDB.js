import requestHandler from '../server/requestsHandler'

const getTotalJobs =async () => {
        return (await requestHandler('get','/utils/get-jobs-count')).data[0].count   
}
const jobsByCategoryId = async (categoryId) => {
   const data= (await requestHandler('get', `/utils/jobs-by-category?categoryId=${categoryId}`)).data.data
    return data
}
const getUserSavedJobs = async (userId,token) => {
        const result=await requestHandler('get',`/users/get-saved-list/${userId}`,{
                headers: {
                    'Authorization':JSON.stringify('Bearer '+token)
                }
        })
        console.log("🚀 ~ file: jobsDB.js ~ line 16 ~ getUserSavedJobs ~ result", result)
        
        return result.data
}
const searchJobs = async ({ sortBy, searchWord, isSenor, activeFilters, resultsLimit
        , resultOffset, isSearchOnlyLastWeek }) => {
        
        const result=await requestHandler('get','/jobs',{
                params: {
                    sortBy:sortBy,
                    searchWord: searchWord,
                    isSenorSearch: isSenor,
                    job_type:activeFilters&&activeFilters.type? activeFilters.type:"",
                    positions:activeFilters&&activeFilters.positions? activeFilters.positions:"",
                    location_area:activeFilters&&activeFilters.location_area? activeFilters.location_area:"",
                    resultsLimit,
                    resultOffset: resultOffset,
                    openJobsOnly: true,
                    dateLimits: isSearchOnlyLastWeek,
                }
            })
   return { rows: result.data.rows, total: result.data.total }

         
}
const insertNewJob = async (formData,user) => {
       const result= await requestHandler('put','/jobs/insert',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify('Bearer ' + user.token) ,
           
                 },
        data: JSON.stringify({...formData,user })
       })
        return result
        
}
const updateJob = async(jobId,formData ,user,end_date) => {
       const result=await requestHandler('put','/jobs/update',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization':JSON.stringify('Bearer '+user.token),
           
                 },
        data: JSON.stringify({...formData,id:jobId,user:user,end_date})
       })
        return result
}
const removeJob = async (jobId,user) => {
        const result = await requestHandler('delete', `/jobs/remove/${jobId}/${user.data.email}`, {
                headers: {
                        'Content-Type': 'application/json',
                             },
                    data: JSON.stringify({ user: user.data,Authorization:JSON.stringify('Bearer '+user.token) })
        })
        return result
}
const getJobPositions = async (jobId) => {
        return (await requestHandler('get',`/jobs/jobs-get-positions/${jobId}`)).data
}
export {getTotalJobs,getJobPositions,removeJob,jobsByCategoryId,getUserSavedJobs,searchJobs,insertNewJob,updateJob}