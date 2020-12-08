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
             ${Array.isArray(categoryId) ? ` jobs.category IN (${categoryId.map((id) => `'${id}'`)})` :
            `jobs.category = ${ categoryId }`
} AND
             jobs.end_date IS NULL 
             GROUP BY positions.id,positions.name
             
             
             `)
}
const getLocationAreas = () => {
    return (`
    SELECT DISTINCT(jobs.location_area) FROM jobs
    `)
}
const getPositionsType = () => {
    return (`
    SELECT DISTINCT(jobs.type) FROM jobs
    `)
}
const isUserAgent = (userUid,agentId) => {
    return (`
    SELECT true
    FROM user_smart_agents
    WHERE EXISTS  ( SELECT * FROM user_smart_agents WHERE user_uid='${userUid}' AND id=${agentId} )
    `)
}
module.exports={getJobCompanyUid,isUserAgent,getPositionsType,getLocationAreas,getPositionsList,getCategoryIdByName,getCategoryList,getAllCompanies,getOpenJobsCount,getTokenRow,getPositionsAvailableByPositionCategory}