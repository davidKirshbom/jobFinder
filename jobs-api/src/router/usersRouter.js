const express = require('express');
const client = require('../postgres');
const {insertNewCompany}=require('../querys/insertQuerys')
const router = new express.Router();//"/users"
router.post('/registar/company', async (req, res) => {
    const data = JSON.parse(req.body.data);
    console.log((insertNewCompany({...data})))
    try {
        client.query(insertNewCompany({...data})).then((value) => {
            console.log(value)
        })
    } catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
module.exports = router;
