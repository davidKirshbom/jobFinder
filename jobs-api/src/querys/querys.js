
const searchJob = (parameters) => {
    let sortBy,dateLimits,occupation,job_type,positions,location_area,resultOffset, searchWord, isSenorSearch, filters, resultsLimit,openJobsOnly;
    if (parameters) {
        sortBy =parameters.sortBy?JSON.parse(parameters.sortBy):undefined;
        searchWord =parameters.searchWord==='undefined'?'': parameters.searchWord  
        console.log("🚀 ~ file: querys.js ~ line 7 ~ searchJob ~ searchWord", searchWord)
        
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
             
             ${job_type&&job_type!=='all types' ? ` type IN (${job_type})` : "1=1"} AND
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
    return (`SELECT * FROM positions
            INNER JOIN position_jobs_connection ON position_jobs_connection.position_id=positions.id
            WHERE position_jobs_connection.job_id='${id}'`)
}
const getUserSavedJobs = (userId) => {
    return (`SELECT jobs.* FROM user_saved_jobs 
            INNER JOIN jobs ON jobs.id=user_saved_jobs.job_id
            WHERE user_uid='${userId}'
    `)
}
const getUserSendedJobs = (userId) => {
    return (`SELECT jobs.* FROM user_sended_jobs 
            INNER JOIN jobs ON jobs.id=user_sended_jobs.job_id
            WHERE user_uid='${userId}'
    `)
}
const getAgents = (userUid, agentId) => {
   
    return (`
    SELECT *,TRUNC(DATE_PART('day', NOW() - last_scan_date)/7) AS weeks_from_last_scan  FROM user_smart_agents 
    INNER JOIN (SELECT agent_id,string_agg(positions_category.name,',') AS categories,string_agg(CAST(positions_category.id AS varchar),',') AS catgories_id FROM smart_agent_categories
                INNER JOIN positions_category ON positions_category.id=smart_agent_categories.category_id 
                GROUP BY smart_agent_categories.agent_id) AS categories
    ON categories.agent_id=user_smart_agents.id
    INNER JOIN (SELECT smart_agent_positions.agent_id,string_agg(positions.name,',') AS positions,string_agg(CAST(positions.id AS varchar),',') AS positions_id FROM smart_agent_positions
                INNER JOIN positions ON positions.id=smart_agent_positions.position_id 
                GROUP BY smart_agent_positions.agent_id) AS positions
    ON positions.agent_id=user_smart_agents.id
    LEFT JOIN (SELECT agent_id,COALESCE(COUNT(job_id),0) AS last_scan_found_count FROM agents_sended_jobs GROUP BY agent_id) AS last_scan_result
    ON last_scan_result.agent_id=user_smart_agents.id
    WHERE ${userUid ? ` user_smart_agents.user_uid='${userUid}'` : '1=1'} AND
    ${agentId?`user_smart_agents.id=${agentId}`:'1=1'}
    `)
}
const getAgentsPositions = (agentId) => {
    return (`
    SELECT smart_agent_positions.position_id AS id,positions.name FROM smart_agent_positions
    INNER JOIN positions ON positions.id=smart_agent_positions.position_id
    WHERE agent_id=${agentId}
    `)
}
const getAgentsCategories = (agentId) => {
    return (`
    SELECT smart_agent_categories.category_id AS id,positions_category.name FROM smart_agent_categories
    INNER JOIN positions_category ON positions_category.id=smart_agent_categories.category_id 
    WHERE agent_id=${agentId}
    `)
}
const getLastScanResult = (agentId) => {
    return (`
    SELECT jobs.*,agents_sended_jobs.scanned_date FROM jobs
    INNER JOIN agents_sended_jobs ON agents_sended_jobs.job_id=jobs.id
    WHERE agents_sended_jobs.agent_id=${agentId}
    `)
}
module.exports = {
    getJobPositionById, searchJob, getCompanysJobs, getPositionsByJobId, searchJobCount, getUserLoginData, getUserByUidAndType,
    getUserSavedJobs, getUserSendedJobs, getAgents, getAgentsPositions, getAgentsCategories,getLastScanResult
};
// OR (description LIKE '%${searchWord}%') OR ( qualifications LIKE '%${searchWord}%'))