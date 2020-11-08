const insertNewCompany = ({name,phone_number,email,password,area_location,category}) => {
    
    return (`INSERT INTO companies (name,phone_number,email,password,area_location,category) 
    VALUES ('${name}','${phone_number}','${email}','${password}','${area_location}','${category}')
    `);    

}

const insetNewUser = ({ first_name, last_name, phone_number, password, email, email_subscribe, send_auto_cv }) => {
    return (`INSERT INTO users (first_name, last_name, phone_number, password, email,email_subscribe, send_auto_cv)
    VALUES ('${first_name}','${last_name}','${phone_number}','${password}','${email}','${email_subscribe}','${send_auto_cv}')`)
}
const insertUserToken = (email,token) => {
    return (`INSERT INTO tokens (email,token) VALUES ('${email}','${token}')`)
}
const insertPositions = (job_id,position_id) => {
    return (`INSERT INTO position_jobs_connection (job_id,position_id) VALUES ('${ job_id }','${position_id}')`)
}
const insertJobsTableReturnId = ({role_name,description,qualifications,company_uid,location_area,type,experience_years,category,is_managerial_position}) => {
    return (`INSERT INTO jobs (role_name,description,qualifications,company_uid,location_area,type,experience_years,category,is_managerial_position)
                        VALUES ('${role_name}','${description}','${qualifications}','${company_uid}','${location_area}','${type}','${experience_years}',${category},'${is_managerial_position}')
                        RETURNING id`)
}
module.exports={insertPositions,insertNewCompany,insetNewUser,insertUserToken,insertJobsTableReturnId}