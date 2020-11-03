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

module.exports={updateUser}