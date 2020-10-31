const getAllCompanies = () => {
    
    return("select * from companies")
}
const getOpenJobsCount = () => {
    
    return ("SELECT COUNT(id) FROM jobs WHERE jobs.end_date IS NOT NULL")
}
module.exports={getAllCompanies,getOpenJobsCount}