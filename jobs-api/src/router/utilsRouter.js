const express = require('express');
const client = require('../postgres');
const {getPositionsList,getAllCompanies,getCategoryList,getOpenJobsCount}=require('../querys/utilsQuerys')
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
})

module.exports = router;