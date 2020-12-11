import Axios from "axios"
import history from '../router/history'
export default async (method, relativePath, configObj) => {
console.log("🚀 ~ file: requestsHandler.js ~ line 4 ~ configObj", configObj)
   
    const baseUrl='http://localhost:3000'
    try {
        return await Axios({method,url:baseUrl+relativePath,...configObj})
    } catch (err) {
        if (err.response&&err.response.data.status === 401)
        {
            history.push({pathname:'/',search:'logout=true'})
           
        }
        else
        console.log('global:',err)
    }    
}