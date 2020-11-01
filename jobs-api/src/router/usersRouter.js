const express = require('express');
const client = require('../postgres');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const { insertNewCompany, insetNewUser,insertUserToken } = require('../querys/insertQuerys')
const {getUserLoginData}=require('../querys/querys')
const router =  express.Router();//"/users"
router.post('/registar/company', async (req, res) => {
    const data = JSON.parse(req.body.data);
    console.log("data /registar/company", data)
    const hashPassword=await bcrypt.hash(data.password,8)
    console.log((insertNewCompany({...data,password:hashPassword})))
    try {
        client.query(insertNewCompany({...data,password:hashPassword})).then(async (value) => {
            const token = await generateAuthToken(data.email);
            res.send(token)
        })
    } catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
router.post('/registar/users', async (req, res) => {
    const data = JSON.parse(req.body.data);
    console.log("data /registar/users", data)
    try {
        const hashPassword = await bcrypt.hash(data.password, 8)
       
    console.log(hashPassword)
        client.query(insetNewUser({...data,password:hashPassword})).then(async (value) => {
            
            const token = await generateAuthToken(data.email);
            console.log("token registar/users", token)
            res.send(token)
        }).catch((err)=>console.log("error ",err))
    } catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
const generateAuthToken =async (email) => {
    const token = jwt.sign({
        _id:email,
    },
        process.env.SECRET_TOKEN,
        
        {
        expiresIn:"1h",
    }
    )
   
    try
    {
        console.log(insertUserToken(email, token))
      const  value= await client.query(insertUserToken(email, token))
      console.log("generateAuthToken -> value", value)
            console.log(value)
       if (value.rowCount >= 1)
       {
           console.log("generateAuthToken -> token", token)
           return token;
       }
       else {
           throw new Error()
       }
            
   }
     catch (err) {
       console.log("problem with save token")
    }
}
router.post('/login', async (req, res) => {
    console.log("data /login", req.body)
    const data = req.body;
    
    try {
        client.query(getUserLoginData(data.email)).then(async (value) => {
            const userData = value.rows[0];
            const token=await generateAuthToken(userData.email)
            console.log("value.rows", value.rows)
            const isAuth = await bcrypt.compare(data.password,value.rows[0].password);
            
            if(isAuth)
                res.send(token)
            else 
                res.send('wrong ide')
        }).catch((err)=>console.log("error ",err))
    } catch (err) {
        res.send({
            status: 500,
            message:err.message}) 
    
    }
})
module.exports = router;
