const updateUser = (client,userType) => {
    if(client.userType==='user')
    return (`UPDATE users 
            SET
            ${client.first_name ? `first_name='${client.first_name}' ` : "first_name=first_name"} ,
            ${client.last_name ? `last_name='$client.{last_name}' ` : "last_name=last_name"} ,
            ${client.phone_number ? `phone_number='${client.phone_number}' ` : "phone_number=phone_number"} ,
            ${client.password ? `password='${client.password}' ` : "password=password"} ,
            ${client.email ? `email='${client.email}' ` : "email=email"} ,
            ${client.email_subscribe ? `email_subscribe=${client.email_subscribe} ` : "email_subscribe=email_subscribe"} ,
            ${client.send_auto_cv ? `send_auto_cv=${client.send_auto_cv} ` : "send_auto_cv=send_auto_cv"}
            WHERE
            users.uid='${client.uid}'
            
    `)
    else {
        return (`UPDATE companies 
        SET
        ${client.name ? `name='${client.name}' ` : "first_name=first_name"} ,
       
        ${client.phone_number ? `phone_number='${client.phone_number}' ` : "phone_number=phone_number"} ,
        ${client.password ? `password='${client.password}' ` : "password=password"} ,
        ${client.email ? `email='${client.email}' ` : "email=email"} 
        WHERE
        companies.uuid='${client.uid}'
        
`)
    }
    
}
const updateJobsTable = ({role_name,description ,qualifications,start_date,end_date,id,location_area,type,experience_years,category,is_managerial_position}) => {
    console.log(is_managerial_position)
    return (`UPDATE jobs SET
        ${role_name ? `role_name='${role_name}' ` : "role_name=role_name"} ,
        ${description ? `description='${description}' ` : "description=description"} ,
        ${qualifications ? `qualifications='${qualifications} '` : "qualifications=qualifications"} ,
        ${start_date ? `start_date='${start_date}' ` : "start_date=start_date"} ,
        ${location_area ? `location_area='${location_area} '` : "location_area=location_area"} ,
        ${type ? `type='${type} '` : "type=type"} ,
        ${experience_years ? `experience_years='${experience_years}' ` : "experience_years=experience_years"},
        ${category ? `category='${category}' ` : "category=category"} ,
        ${end_date?`end_date=${end_date}`:'end_date=end_date'},
        ${is_managerial_position!=null ? `is_managerial_position=${is_managerial_position} ` : "is_managerial_position=is_managerial_position"} 
        WHERE
        jobs.id=${id}
    `)
}

module.exports={updateUser,updateJobsTable}