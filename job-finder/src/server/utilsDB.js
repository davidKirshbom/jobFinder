import requestHandler from '../server/requestsHandler'
const getAllCompanies = async () => {
    return (await requestHandler('get','/utils/get-all-companies')).data  
} 
const getAllCategories =async () => {
    return (await requestHandler('get','/utils/get-categorys')).data
}
const getAllPositions = async () => {
    return (await requestHandler('get',`/utils/get-positions`)).data

}
const getAllAreas = async () => {
    return (await requestHandler('get',`/utils/get-areas`)).data
}
const getPositionsType = async () => {
    return (await requestHandler('get',`/utils/get-positions-type`)).data
}
const getAllJobsByCategory = async (categoriesId) => {
    return (await requestHandler('get','/utils/jobs-by-category',{
        params: { categoryId:categoriesId }
    })).data.data
}
export {
    getAllCompanies, getAllJobsByCategory
    , getAllCategories, getAllPositions
    , getAllAreas, getPositionsType
}