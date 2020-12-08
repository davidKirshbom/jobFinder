const express = require('express');

const client  = require('../postgres');
const { searchJob, searchJobCount, getJobPositionById, getUserByUidAndType } = require('../querys/querys');
const { updateJobsTable } = require('../querys/updateQuery')
const { removePosition,removeJob } = require('../querys/removeQuerys');
const { insertPositions,insertJobsTableReturnId,insertUserSendedJobs } = require('../querys/insertQuerys');
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
const isJobsOwner = async (email, token, jobId,userId) => {   
    token = token.replace('Bearer ', '').trim();

    let companyUid
    try
    {

        const isAuth = await isTokenValid(email,JSON.stringify(token))
        console.log("🚀 ~ file: jobsRouter.js ~ line 87 ~ isJobsOwner ~ isAuth", isAuth)
        
        console.log("getJobCompanyUid(jobId)", getJobCompanyUid(jobId))
         companyUid = (await client.query(getJobCompanyUid(jobId))).rows[0].company_uid
        
        console.log("companyUid", companyUid)
    } catch (err) {
        console.log('error with confirm job owner')
      
    }
    return userId===companyUid
}
router.put('/update', async (req, res) => {
console.log("🚀 ~ file: jobsRouter.js ~ line 97 ~ router.put ~ req.body", req.body)
    
    const data =req.body;
    const positionList=data.positions
    // const isAuth = await isTokenValid(data.user.data.email, JSON.parse(req.body.headers.Authorization))
    // const companyUid=(await client.query(getJobCompanyUid(data.id))).rows[0].company_uid
  
    if(await isJobsOwner(data.user.data.email, JSON.parse(req.headers.authorization),data.id,data.user.data.uuid))
    {try
        {
       
        const updateJobsTableQuery = await client.query(updateJobsTable(data))
       console.log('data',data)
       
        console.log(positionList)
        if(positionList)
        {
            console.log("🚀 ~ file: jobsRouter.js ~ line 119 ~ router.put ~ removePosition(data.id)", removePosition(data.id))

            removeOldPosition = await client.query(removePosition(data.id)) 
            
        console.log("🚀 ~ file: jobsRouter.js ~ line 119 ~ router.put ~ removeOldPosition", removeOldPosition)
        
            await positionList.forEach(async position => {
                console.log("🚀 ~ file: jobsRouter.js ~ line 1 ~ router.put ~ data.id, position.id", data.id, position.id)

                const queryAnser = await client.query(insertPositions(data.id, position.id))
                
            console.log("queryAnser", queryAnser)
        });}
       
        res.send('update successful')
    } catch (err) {
        res.status(500).send({status:500,message:'error while updates'})
    }}
    
    
})
router.put('/insert', async (req, res) => {
    console.log("🚀 ~ file: jobsRouter.js ~ line 139 ~ router.put ~ req.body", req.headers)

    const data = req.body;
    console.log("🚀 ~ file: jobsRouter.js ~ line 130 ~ router.put ~ data", data)
    
    const userData=data.user.data
    console.log("insert data", data)
    const positionList=data.positions
  
    const isAuth = await isTokenValid(userData.email,req.headers.authorization)
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
router.delete('/remove/:id/:email', async (req, res) => {
    console.log("req.body.data", req.body)
    const email = req.params.email
   
  
    const id=req.params.id
    console.log("/remove id", id)
    
    console.log("removeJob(id)", removeJob(id))
    if(await isJobsOwner(email, JSON.parse(req.body.Authorization),id,req.body.user.uuid))
    {
        console.log('is auth')
        try
        {
           
        const removeJobsTableQuery = await client.query(removeJob(id))
        
        console.log("removeJobsTableQuery", removeJobsTableQuery)
        const  removeOldPosition=await client.query(removePosition(id))    
        console.log("removeOldPosition", removeOldPosition)
        res.send('update successful')
        } catch (err) {
            console.log(err)
        res.status(500).send({status:500,message:'error while updates'})
    }}
})
router.post('/send-cv/:jobId/:userUid',async (req,res) => {
    const jobId = req.params.jobId;
    const userUid = req.params.userUid;
    console.log('insertUserSendedJobs(userUid,jobId)',insertUserSendedJobs(userUid,jobId))
    try
    {
        const userData = (await client.query(getUserByUidAndType(userUid, 'user'))).rows[0];
        const isAuth =await isTokenValid(userData.email,req.body.headers.Authorization.replace('Bearer ','').trim())       
        if (isAuth) {
            const result= await client.query(insertUserSendedJobs(userUid,jobId))
            res.send(result)
        }
        else throw new Error('not auth')
    
    } catch (err) {
        res.status(404).send({status:404,message:`error ${err}`})
    }
})
module.exports = router;