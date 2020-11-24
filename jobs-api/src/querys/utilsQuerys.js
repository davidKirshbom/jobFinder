const getAllCompanies = () => {
    
    return("select * from companies")
}
const getOpenJobsCount = () => {
    
    return ("SELECT COUNT(id) FROM jobs WHERE jobs.end_date IS NOT NULL")
}
const getTokenRow = (email, token) => {
    return (`SELECT * from tokens WHERE email='${email}' AND token='${token}'`)
}
const getCategoryList = () => {
    return ('SELECT * FROM positions_category')
}
const getPositionsList = () => {
    return ('SELECT * FROM positions')
}
const getCategoryIdByName = (name) => {
    return (`SELECT name FROM positions_category WHERE name='${ name }'`)
}
const getJobCompanyUid = (jobId) => {
    return(`SELECT company_uid from jobs WHERE id='${jobId}'`)
}
const getPositionsAvailableByPositionCategory = (categoryId) => {
    return (`SELECT COUNT(positions.id),positions.id,positions.name FROM positions 
             INNER JOIN position_jobs_connection ON positions.id=position_jobs_connection.position_id
             INNER JOIN jobs ON jobs.id=position_jobs_connection.job_id
             WHERE
             jobs.category=${categoryId} AND
             jobs.end_date IS NULL 
             GROUP BY positions.id,positions.name
             
             
             `)
}
module.exports={getJobCompanyUid,getPositionsList,getCategoryIdByName,getCategoryList,getAllCompanies,getOpenJobsCount,getTokenRow,getPositionsAvailableByPositionCategory}