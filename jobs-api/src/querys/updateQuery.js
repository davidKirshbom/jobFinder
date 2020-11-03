const updateUser = ({uid, first_name, last_name, phone_number, password, email, email_subscribe, send_auto_cv}) => {
    return (`UPDATE users 
            SET
            ${first_name ? `first_name='${first_name}' ` : "first_name=first_name"} ,
            ${last_name ? `last_name='${last_name}' ` : "last_name=last_name"} ,
            ${phone_number ? `phone_number='${phone_number}' ` : "phone_number=phone_number"} ,
            ${password ? `password='${password}' ` : "password=password"} ,
            ${email ? `email='${email}' ` : "email=email"} ,
            ${email_subscribe ? `email_subscribe=${email_subscribe} ` : "email_subscribe=email_subscribe"} ,
            ${send_auto_cv ? `send_auto_cv=${send_auto_cv} ` : "send_auto_cv=send_auto_cv"}
            WHERE
            users.uid='${uid}'
            
    `)
    
}

module.exports={updateUser}