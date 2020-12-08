import Axios from "axios"

export default async (method, relativePath, configObj) => {
console.log("🚀 ~ file: requestsHandler.js ~ line 4 ~ configObj", configObj)
    
    const baseUrl='http://localhost:3000'
    try {
        return await Axios({method,url:baseUrl+relativePath,...configObj})
    } catch (err) {
        console.log(err)
        throw  err
    }    
}