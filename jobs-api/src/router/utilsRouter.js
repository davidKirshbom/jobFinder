const express = require('express');
const client = require('../postgres');
const {getPositionsList,getAllCompanies,getCategoryList,getOpenJobsCount,getPositionsAvailableByPositionCategory, getLocationAreas, getPositionsType}=require('../querys/utilsQuerys')
const router =  express.Router();//"/utils"
router.get('/get-all-companies', async (req, res) => {
    console.log((getAllCompanies()))
    try {
        client.query(getAllCompanies()).then((value) => {
            
            res.send(value.rows);
        })
    } catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
router.get('/get-jobs-count', async (req, res) => {
    console.log((getOpenJobsCount()))
    try {
        client.query(getOpenJobsCount()).then((value) => {
            
            res.send(value.rows);
        }).catch((err)=>console.log(err))
    }catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
router.get('/get-categorys', async (req, res) => {
    try {
        client.query(getCategoryList()).then((value) => {
            res.send(value.rows)
        })
    } catch (err) {
        console.log(err)
    }
})
router.get('/get-positions', async (req, res) => {
    try {
        client.query(getPositionsList()).then((value) => {
            res.send(value.rows)
        })
    } catch (err) {
        console.log(err)
    }
});

router.get('/jobs-by-category', async (req, res) => {
    const categoryId = req.query.categoryId;
    
    console.log("🚀 ~ file: utilsRouter.js ~ line 70 ~ router.get ~ categoryId", categoryId)
    if(categoryId)
    {
    try {
        const queryResult = (await client.query(getPositionsAvailableByPositionCategory(categoryId)))
        const sendResult = { data: queryResult.rows, total: queryResult.rowCount };
       return res.send(sendResult);
            
    } catch (err) {
        console.log(err)
        }
    }
    else
        res.status(404).send({status:404, message:'no category id'})
})
router.get('/get-areas', async (req, res) => {
    try {
        const areasList=(await client.query(getLocationAreas())).rows
        res.send(areasList)
    }
    catch (err) {
        res.status(404).send({status:404,message:err})
    }
})

router.get('/get-positions-type', async (req, res) => {
    try {
        const areasList=(await client.query(getPositionsType())).rows
        res.send(areasList)
    }
    catch (err) {
        res.status(404).send({status:404,message:err})
    }
})

module.exports = router;