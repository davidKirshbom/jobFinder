import requestHandler from './requestsHandler'
const updateUserCompany = async (user, updatedUserData) => {  
    const updateResult = (await requestHandler('put', '/users/update',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization':JSON.stringify('Bearer '+user.token),
           
                 },
        data: JSON.stringify(updatedUserData)
    }
        
        
    ))
    const userUpdatedData = (await requestHandler('get', `/users/get-user/${updatedUserData.uid}/company`))    
        return  userUpdatedData.data.rows[0]

}
const registerCompany = async (companyData) => {
console.log("🚀 ~ file: usersDB.js ~ line 19 ~ registerCompany ~ companyData", companyData)
    
    const result =(await requestHandler('post','/users/registar/company',{
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(companyData)
    })).data

    return result
}
const userSaveJob = async (jobId, user) => {
    return (await requestHandler('post',`/users/save-job/${jobId}/${user.data.uid}`,{
        headers: {
        'Authorization' :JSON.stringify('Bearer '+user.token), 
       }
   }))
}
const removeUserSavedJob = async (jobId, user) => {
    return (await requestHandler('post', `/users/remove-save-job/${jobId}/${user.data.uid}`, {
        headers: {
            'Authorization': JSON.stringify('Bearer '+user.token),
        }
    }))
}
const sendCv = async (jobId,user) => {
    return (await requestHandler('post',`/jobs/send-cv/${jobId}/${user.data.uid}`,{
        headers: {
        'Authorization' :'Bearer '+user.token, 
       }
    }))

}
const updateUser = async (updatedData, user) => {
   
        const updateResult = await requestHandler('put', '/users/update', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify('Bearer ' + user.token),
           
            },
            data: JSON.stringify(updatedData)
        })
    
        const userUpdatedDB = (await requestHandler('get', `/users/get-user/${user.data.uid}/user`)).data.rows[0]
  
        return { data: userUpdatedDB, token: user.token }
}
const registerUser = async (userData) => {    
    return (await requestHandler('post','/users/registar/users',{
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(userData)
    })).data

    
}        
const getCompanyJobs =async (user) => {
    const result = (await requestHandler('get', `/users/company-job-wall/${user.data.email}/${user.data.uuid}`,
    {
        headers: {
            'Authorization': JSON.stringify('Bearer ' + user.token)  
        },
       
        })).data
    return result
}
const getSavedJobs = async (userId, token) => {
    
    return (await requestHandler('get',`/users/get-saved-list/${userId}`,{
        headers: {
            'Authorization': JSON.stringify('Bearer ' + token)
        }
    })).data
}
const getSendedUserJobs = async (userId, token) => {
    return (await requestHandler('get',`/users/get-sended-list/${userId}`,{
        headers: {
            'Authorization': JSON.stringify('Bearer ' + token)
        }
    })).data
}
export {
    updateUserCompany, registerCompany,
    userSaveJob, removeUserSavedJob,
    sendCv, updateUser, registerUser, getCompanyJobs,
    getSavedJobs,getSendedUserJobs
}