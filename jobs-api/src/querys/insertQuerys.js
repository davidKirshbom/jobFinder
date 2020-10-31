const insertNewCompany = ({name,phone_number,email,password,area_location,category}) => {
    
    return (`INSERT INTO companies (name,phone_number,email,password,area_location,category) 
    VALUES ('${name}','${phone_number}','${email}','${password}','${area_location}','${category}')
    `);    

}

const insetNewUser = ({ first_name, last_name, phone_number, password, email, email_subscribe, send_auto_cv }) => {
    return (`INSERT INTO users (first_name, last_name, phone_number, password, email,email_subscribe, send_auto_cv)
    VALUES ('${first_name}','${last_name}','${phone_number}','${password}','${email}','${email_subscribe}','${send_auto_cv}')`)
}
module.exports={insertNewCompany,insetNewUser}