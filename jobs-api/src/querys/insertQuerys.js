const insertNewCompany = ({name,phone_number,email,password,area_location,category}) => {
    
    return (`INSERT INTO companies (name,phone_number,email,password,area_location,category) 
    VALUES ('${name}','${phone_number}','${email}','${password}','${area_location}','${category}')
    RETURNING uuid`);    

}

const insetNewUser = ({ first_name, last_name, phone_number, password, email, email_subscribe, send_auto_cv }) => {
    return (`INSERT INTO users (first_name, last_name, phone_number, password, email,email_subscribe, send_auto_cv)
    VALUES ('${first_name}','${last_name}','${phone_number}','${password}','${email}','${email_subscribe}','${send_auto_cv}')
    RETURNING uid`)
}
const insertUserToken = (email,token) => {
    return (`INSERT INTO tokens (email,token) VALUES ('${email}','${token}')`)
}
const insertPositions = (job_id,position_id) => {
    return (`INSERT INTO position_jobs_connection (job_id,position_id) VALUES ('${ job_id }','${position_id}')`)
}
const insertJobsTableReturnId = ({role_name,description,qualifications,company_uid,location_area,type,experience_years,category,is_managerial_position=false}) => {
    return (`INSERT INTO jobs (role_name,description,qualifications,company_uid,location_area,type,experience_years,category,is_managerial_position)
                        VALUES ('${role_name}','${description}','${qualifications}','${company_uid}','${location_area}','${type}','${experience_years}',${category},'${is_managerial_position}')
                        RETURNING id`)
}
const insertSaveJob = (userUid, jobId) => {
    return(`INSERT INTO user_saved_jobs (user_uid,job_id) VALUES ('${userUid}',${jobId})`)
}
const insertUserSendedJobs = (userUid, jobId) => {
    return (`INSERT INTO user_sended_jobs (job_id,user_uid) VALUES (${jobId},'${userUid}')`)
}
const insertNewAgent = ({ name, frequency, jobType, userUid, location, searchWords }) => {
    return (`
    INSERT INTO user_smart_agents (name,location_area,job_type,search_words,user_uid,frequency_weeks) VALUES ('${name}','${location}','${jobType}','{${searchWords}}','${userUid}',${frequency})
    RETURNING id
    `)
}
const insertCategoriesPositionsToAgent = (categories, positions, id) => {
    let insertPositionsQuery=''
    let insertCategoriesQuery=''
    positions.forEach((position)=>insertPositionsQuery+=` INSERT INTO smart_agent_positions (agent_id,position_id) VALUES (${id},${position});\n`)
   categories.forEach((category)=>insertCategoriesQuery+=`INSERT INTO smart_agent_categories (agent_id,category_id) VALUES (${id},${category});\n`)
    return insertCategoriesQuery+insertPositionsQuery
}
const insertAgentSandedEmail = (agentId,jobId) => {
    return (`
    INSERT INTO agents_sended_jobs (agent_id,job_id,scanned_date) VALUES (${agentId},${jobId},NOW())
    `)
}
module.exports={insertAgentSandedEmail,insertPositions,insertNewAgent,insertCategoriesPositionsToAgent,insertUserSendedJobs,insertNewCompany,insetNewUser,insertUserToken,insertJobsTableReturnId,insertSaveJob}