
const searchJob = (parameters) => {
    let sortBy,occupation,job_type,positions,location_area,resultOffset, searchWord, isSenorSearch, filters, resultsLimit,openJobsOnly;
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
        
    }
    console.log(isSenorSearch)
    return (`SELECT jobs.*,companies.category AS company_occupation,p.category FROM jobs
            INNER JOIN companies ON jobs.company_uid=companies.uuid 
            INNER JOIN (SELECT position_jobs_connection.job_id,string_agg(positions.name,',') AS category FROM position_jobs_connection
                  INNER JOIN positions ON positions.id=position_jobs_connection.position_id
                  ${positions ? `WHERE positions.name IN (${positions})`:"" }
                  GROUP BY position_jobs_connection.job_id) AS p 
                  ON jobs.id=p.job_id
            WHERE
            ${searchWord ? ` (role_name LIKE '%${searchWord}%' OR description LIKE '%${searchWord}%' OR  qualifications LIKE '%${searchWord}%' )` : '1=1'} AND
            ${isSenorSearch==='true' ? " role_name LIKE '%senor%' " : "1=1"} AND
             ${filters ? getFiltersQueryString(filters)  : "1=1"} AND
             ${openJobsOnly ? " jobs.end_date IS NULL " : "1=1"} AND
             ${location_area ? `location_area IN (${location_area})`:"1=1"} AND
             
             ${job_type?` companies.category IN (${job_type})`:"1=1"}
            ${sortBy != null ? (`ORDER BY jobs.${sortBy.attribute} ${sortBy.isAscending ? "ASC" : "DESC"}`)
            : (`ORDER BY jobs.start_date`)}
             ${resultsLimit ? ` LIMIT ${resultsLimit}` : ""}
             ${resultOffset?`OFFSET ${resultOffset}`:""}
            
    `)


}
const getPositionsByJobId = (idString) => {
    return (`SELECT jobs.id, positions.name FROM jobs
            INNER JOIN position_jobs_connection ON  jobs.id=position_jobs_connection.job_id
            INNER JOIN positions ON position_jobs_connection.position_id=positions.id
            WHERE jobs.id IN (${idString})
    `)
}

module.exports = {searchJob,getPositionsByJobId};
// OR (description LIKE '%${searchWord}%') OR ( qualifications LIKE '%${searchWord}%'))