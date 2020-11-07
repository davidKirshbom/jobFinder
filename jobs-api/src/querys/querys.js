
const searchJob = (parameters) => {
    let sortBy,dateLimits,occupation,job_type,positions,location_area,resultOffset, searchWord, isSenorSearch, filters, resultsLimit,openJobsOnly;
    if (parameters) {
        sortBy =parameters.sortBy?JSON.parse(parameters.sortBy):undefined;
        searchWord = parameters.searchWord
        isSenorSearch = parameters.isSenorSearch
        positions = parameters.positions
        resultsLimit = parameters.resultsLimit
        resultOffset = parameters.resultOffset;
        openJobsOnly=parameters.openJobsOnly
        location_area = parameters.location_area
        job_type = parameters.job_type
        dateLimits=parameters.dateLimits
    }
    return (`SELECT jobs.*,companies.category AS company_occupation,p.category as additional_positions,positions_category.name as category FROM jobs
            INNER JOIN positions_category ON jobs.category=positions_category.id
            INNER JOIN companies ON jobs.company_uid=companies.uuid 
            INNER JOIN (SELECT position_jobs_connection.job_id,string_agg(positions.name,',') AS category FROM position_jobs_connection
                  INNER JOIN positions ON positions.id=position_jobs_connection.position_id
                  ${positions ? `WHERE upper(positions.name) IN (${positions.toUpperCase()})`:"" }
                  GROUP BY position_jobs_connection.job_id) AS p 
                  ON jobs.id=p.job_id
            WHERE
            ${searchWord ? ` (role_name ILIKE '%${searchWord}%' OR description ILIKE '%${searchWord}%' OR  qualifications ILIKE '%${searchWord}%' )` : '1=1'} AND
            ${isSenorSearch==='true' ? " jobs.is_managerial_position='True' " : "1=1"} AND
             ${filters ? getFiltersQueryString(filters)  : "1=1"} AND
             ${openJobsOnly ? " jobs.end_date IS NULL " : "1=1"} AND
             ${location_area ? `location_area IN (${location_area})`:"1=1"} AND
             
             ${job_type ? ` positions_category.name IN (${job_type})` : "1=1"} AND
             ${dateLimits==='true'?`jobs.start_date BETWEEN current_date - integer '7' AND current_date `:"1=1"}
            ${sortBy&&sortBy.attribute? (`ORDER BY jobs.${sortBy.attribute} ${sortBy.isAscending ? "ASC" : "DESC"}`)
            : (`ORDER BY jobs.start_date`)}
             ${resultsLimit ? ` LIMIT ${resultsLimit}` : ""}
             ${resultOffset?`OFFSET ${resultOffset}`:""}
            
    `)
}
const searchJobCount = (parameters) => {
    let dateLimit,occupation,job_type,positions,location_area,resultOffset, searchWord, isSenorSearch, filters, resultsLimit,openJobsOnly;
    if (parameters) {
        sortBy = parameters.sortBy;
        searchWord = parameters.searchWord
        isSenorSearch = parameters.isSenorSearch
        positions = parameters.positions
        resultsLimit = parameters.resultsLimit
        resultOffset = parameters.resultOffset;
        openJobsOnly=parameters.openJobsOnly
        location_area = parameters.location_area
        job_type = parameters.job_type
        dateLimits=parameters.dateLimits
    }
    
    return (`SELECT COUNT(*) FROM (SELECT jobs.*,companies.category AS company_occupation,p.category as additional_positions,positions_category.name as category FROM jobs
        INNER JOIN positions_category ON jobs.category=positions_category.id
        INNER JOIN companies ON jobs.company_uid=companies.uuid 
        INNER JOIN (SELECT position_jobs_connection.job_id,string_agg(positions.name,',') AS category FROM position_jobs_connection
              INNER JOIN positions ON positions.id=position_jobs_connection.position_id
              ${positions ? `WHERE upper(positions.name) IN (${positions.toUpperCase()})`:"" }
              GROUP BY position_jobs_connection.job_id) AS p 
              ON jobs.id=p.job_id
        WHERE
        ${searchWord ? ` (role_name ILIKE '%${searchWord}%' OR description ILIKE '%${searchWord}%' OR  qualifications ILIKE '%${searchWord}%' )` : '1=1'} AND
        ${isSenorSearch==='true' ? " jobs.is_managerial_position='True' " : "1=1"} AND
         ${filters ? getFiltersQueryString(filters)  : "1=1"} AND
         ${openJobsOnly ? " jobs.end_date IS NULL " : "1=1"} AND
         ${location_area ? `location_area IN (${location_area})`:"1=1"} AND
         
         ${job_type ? ` positions_category.name IN (${job_type})` : "1=1"} AND
         ${dateLimits==='true'?`jobs.start_date BETWEEN current_date - integer '7' AND current_date `:"1=1"}
    
         
          ) AS allTable 
    `)
}
const getPositionsByJobId = (idString) => {
    return (`SELECT jobs.id, positions.name FROM jobs
            INNER JOIN position_jobs_connection ON  jobs.id=position_jobs_connection.job_id
            INNER JOIN positions ON position_jobs_connection.position_id=positions.id
            WHERE jobs.id IN (${idString})
    `)
}
const getUserByUidAndType = (uid, type) => {
    if (type === 'user')
    return (`SELECT users.*,'user' AS user_type FROM users
    WHERE users.uid='${uid}'`)
    else
   return(`SELECT companies.*,'company' AS user_type FROM companies
    WHERE companies.uuid='${uid}' `)
}
const getUserLoginData = (userEmail) => {
    return (`SELECT users.uid,users.email,users.password,'user' AS user_type FROM users
            WHERE users.email='${userEmail}'
            UNION
            SELECT companies.uuid,companies.email,companies.password,'company' AS user_type FROM companies
            WHERE companies.email='${userEmail}'
    `)
}

const getCompanysJobs = (uid) => {
    return(`SELECT * FROM jobs WHERE company_uid='${uid}'`)
}
const getJobPositionById = (id) => {
    return (`SELECT positions.name FROM positions
            INNER JOIN position_jobs_connection ON position_jobs_connection.position_id=positions.id
            WHERE position_jobs_connection.job_id='${id}'`)
}
module.exports = {getJobPositionById,searchJob,getCompanysJobs,getPositionsByJobId,searchJobCount,getUserLoginData,getUserByUidAndType};
// OR (description LIKE '%${searchWord}%') OR ( qualifications LIKE '%${searchWord}%'))