
import requestHandler from './requestsHandler'
const login = async (email, password) => {
    try
    {
        const userData =await requestHandler('post','/users/login',{
            headers: { 'Content-Type': 'application/json' },
            data: ({ email, password })
            })
        console.log("🚀 ~ file: auth.js ~ line 10 ~ login ~ userData", userData)
            
               
        return { data: userData.data.user, token: userData.data.token }
    }
    catch (err) {
       
            throw new Error(err)
    }
}

export {login}