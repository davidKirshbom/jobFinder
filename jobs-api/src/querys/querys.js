const getFiltersQUeryString = (filters) => {
    if (!filters)
        return "";
    let query="";
    if (filters.jobs_type&&filters.jobs_type.length>0)
    {
        query += `job_type IN ('${filters.jobs_type.join(`','`)}')`;
    }
    if (filters.positions&&filters.positions.length>0)
    {
        if (query.length > 0)
            query+="AND "
        query +=`positions.name IN ('${filters.positions.join(`','`)}') `
    }
    if (filters.jobArea && filters.jobsArea.length > 0)
    {
        if (query.length > 0)
            query+="AND "
        query+=`location_area IN ('${filters.jobsArea.join(`','`)}') `
    }
    return query;
}
const searchJob = ({sortBy, searchWord, isSenorSearch, filters}) => {
    return (`SELECT jobs.* ,positions.name FROM jobs 
            INNER JOIN position_jobs_connection ON jobs.id=position_jobs_connection.job_id
            INNER JOIN positions ON position_jobs_connection.position_id=positions.id
            ${searchWord?`WHERE role_name LIKE '%${searchWord}%' OR description LIKE '%${searchWord}%' OR  qualifications LIKE '%${searchWord}%'`:''}
            ${isSenorSearch ? "AND role_name LIKE '%senor%'" : ""}
             ${filters ?"AND "+ getFiltersQUeryString(filters) : ""}
            ${sortBy? `ORDER BY jobs.${ sortBy.attribute } ${ sortBy.isAscending ? "ASC" : "DESC" }`:""}
            
    `)


}


module.exports = searchJob;
// OR (description LIKE '%${searchWord}%') OR ( qualifications LIKE '%${searchWord}%'))