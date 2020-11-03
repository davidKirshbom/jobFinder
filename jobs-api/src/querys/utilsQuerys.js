const getAllCompanies = () => {
    
    return("select * from companies")
}
const getOpenJobsCount = () => {
    
    return ("SELECT COUNT(id) FROM jobs WHERE jobs.end_date IS NOT NULL")
}
const getTokenRow = (email, token) => {
    return (`SELECT * from tokens WHERE email='${email}' AND token='${token}'`)
}
module.exports={getAllCompanies,getOpenJobsCount,getTokenRow}