const express = require('express');
const client = require('../postgres');
const {insertNewCompany,insetNewUser}=require('../querys/insertQuerys')
const router =  express.Router();//"/users"
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
router.post('/registar/users', async (req, res) => {
    const data = JSON.parse(req.body.data);
    console.log((insetNewUser({...data})))
    try {
        client.query(insetNewUser({...data})).then((value) => {
            res.send(value)
        }).catch((err)=>console.log("error ",err))
    } catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
module.exports = router;
