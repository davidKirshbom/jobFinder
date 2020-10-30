const express = require('express');
const client = require('../postgres');
const {getAllCompanies}=require('../querys/utilsQuerys')
const router = new express.Router();//"/utils"
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
module.exports = router;