const express = require('express');

const client  = require('../postgres');
const { searchJob, searchJobCount, getJobPositionById } = require('../querys/querys');
const { updateJobsTable } = require('../querys/updateQuery')
const { removePosition } = require('../querys/removeQuerys');
const { insertPositions,insertJobsTableReturnId } = require('../querys/insertQuerys');
const { getJobCompanyUid } = require('../querys/utilsQuerys')
const { isTokenValid } = require('../utils/tokenUtils');
const { json } = require('express');
const jwt = require("jsonwebtoken");
const router =  express.Router();
// const client = new Client({
//     connectionString: process.env.CONNECTION_STRING,
// })

// client.connect();


router.get('', async (req, res) => {
console.log("jobs=>req, res", req, res)
   
    if (Object.keys(req.query).length === 0)
    {
        try
        {
            Promise.all([client.query(searchJob()), client.query(searchJobCount())])
            .then(([jobsQueryResult, totalQueryResult]) => {
                let total = totalQueryResult.rows[0].count
                console.log("total results ",total)
                return res.send({rows:jobsQueryResult.rows,total:total})
        })
          
         }catch (err) {
            res.send({
                status: 500,
                message:err.message}) 
        }
    }
    else {
        const possibaleSearchAttributes = ["dateLimits","resultOffset","openJobsOnly","resultsLimit", "sortBy", "searchWord", "isSenorSearch", "job_type","positions","location_area"]
        console.log("search query: \n", searchJob(req.query))
        console.log("total query :",searchJobCount(req.query))
        try {
            for (let query in req.query) {
                if (!possibaleSearchAttributes.includes(query))
                    return res.send({
                        status: 500,
                        message: "query not legal"
                    })
            }
            Promise.all([client.query(searchJob(req.query)), client.query(searchJobCount(req.query))])
                .then(([jobsQueryResult, totalQueryResult]) => {
                    let total = totalQueryResult.rows[0].count
                    // console.log("rows",jobsQueryResult.rows)
                    console.log("total results",total)
                    return res.send({ rows: jobsQueryResult.rows, total: total })
            })
          
        }catch (err) {
            res.send({
                status: 500,
                message:err.message}) 
        }
    }
})
router.get('/jobs-get-positions/:id', (req, res) => {
    const id=req.params.id
    // console.log("getJobPositionById(req.params.id)", getJobPositionById(req.params.id))
    console.log("req.params", req.params)
    if(id)
    client.query(getJobPositionById(req.params.id)).then((value) => {
    
        res.send(value.rows)
    }).catch(err=>console.log(err))
})
router.post('/registar/company', async (req, res) => {
    console.log(req.data)
})
router.put('/update',async (req, res) => {
    const data =JSON.parse(req.body.data);
    console.log("update data", data)
    const positionList=data.positions
    console.log("req.body.headers.Authorization", req.body.headers.Authorization)
    const isAuth = await isTokenValid(data.user.data.email, JSON.parse(req.body.headers.Authorization))
    const companyUid=(await client.query(getJobCompanyUid(data.id))).rows[0].company_uid
    console.log("companyUid", companyUid)
    console.log("data.user.data.userId", data.user.data.uuid)
    const isJobOwner=data.user.data.uuid===companyUid
    
    console.log("isJobOwner", isJobOwner)
    if(isAuth&&isJobOwner)
    {try
    {
        const updateJobsTableQuery = await client.query(updateJobsTable(data))
       console.log('data',data)
        console.log("updateJobsTable(data)", updateJobsTable(data))
        console.log(positionList)
        if(positionList)
        { removeOldPosition=await client.query(removePosition(data.id))  
        await positionList.forEach(async position => {
            
            const queryAnser = await client.query(insertPositions(data.id, position.id))
            console.log("queryAnser", position)
        });}
       
        res.send('update successful')
    } catch (err) {
        res.status(500).send({status:500,message:'error while updates'})
    }}
    
    
})
router.put('/insert',async (req, res) => {
    const data = JSON.parse(req.body.data);
    const userData=data.user.data
    console.log("insert data", data)
    const positionList=data.positions
    console.log("req.body.headers.Authorization", req.body.headers.Authorization)
    const isAuth = await isTokenValid(userData.email, JSON.parse(req.body.headers.Authorization))
    console.log("isAuth", isAuth)
    console.log('insert data ,userData', data, userData)
    console.log("insertJobsTable({...data,...userData,company_uid:userData.uuid})", insertJobsTableReturnId({...data,...userData,company_uid:userData.uuid,category:data.category}))
    if(isAuth)
    {
        try
        {
       
        const updateJobsTableQuery = await client.query(insertJobsTableReturnId({...data,...userData,company_uid:userData.uuid,category:data.category}))
       
        console.log("updateJobsTableQuery", updateJobsTableQuery)
        console.log(positionList)
        if (positionList) {
          
            await positionList.forEach(async position => {
                console.log("queryAnser", position)
                const queryAnser = await client.query(insertPositions(updateJobsTableQuery.rows[0].id, position.id))
            
            });
        }
       
        res.send('update successful')
    } catch (err) {
        res.status(500).send({status:500,message:'error while updates'})
    }}
    
    
})
module.exports = router;