const insertNewCompany = ({name,phone_number,email,password,area_location,category}) => {
    
    return (`INSERT INTO companies (name,phone_number,email,password,area_location,category) 
    VALUES ('${name}','${phone_number}','${email}','${password}','${area_location}','${category}')
    `);    

}
module.exports={insertNewCompany}