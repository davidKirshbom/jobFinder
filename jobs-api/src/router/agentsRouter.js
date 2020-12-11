const express = require("express");
const client = require("../postgres");
const{handleAgentScan}=require('../utils/agentsSearch')
const {isUserAgent}=require('../querys/utilsQuerys')
const { removeAgent } = require("../querys/removeQuerys");
const{ insertNewAgent,
    insertCategoriesPositionsToAgent,
  } = require("../querys/insertQuerys");
const { getAgents, getAgentsCategories, getAgentsPositions,getLastScanResult,getUserLoginData } = require('../querys/querys')
const {isTokenValid}=require('../utils/tokenUtils')
const router = express.Router();
router.post('/new-agent/:uid', async (req, res) => {
    const token = req.headers.authorization;
    const data = req.body;
    console.log("🚀 ~ file: usersRouter.js ~ line 310 ~ router.post ~ data", data)
  
    const email = data.userEmail; 
     data.userUid=req.params.uid
    try {
      const isAuth = await isTokenValid(email, token)
      if (isAuth) {
        const agentId= (await client.query(insertNewAgent(data))).rows[0].id
        const result = (await client.query(insertCategoriesPositionsToAgent(data.categories, data.positions, agentId)))
        res.send(result)
      
      }
    } catch (err) {
      console.log(err)
    }
  })
  router.post('/update-agent/:uid', async (req, res) => {
    const token = req.headers.authorization;
    const data = req.body;
    console.log("🚀 ~ file: usersRouter.js ~update- line 330 ~ router.post ~ data", data)
  
    const email = data.userEmail; 
     data.userUid=req.params.uid
    try {
      const isAuth = await isTokenValid(email, token)
      if (isAuth) {
        const result = (await client.query(removeAgent(data.agentId)))
        const agentId= (await client.query(insertNewAgent(data))).rows[0].id
        const resultInsert = (await client.query(insertCategoriesPositionsToAgent(data.categories, data.positions, agentId)))
   
        res.send('updated')
      
      }
    } catch (err) {
      console.log(err)
    }
  })
  const getAgentsById =async (userUid, agentId) => {
    const result = (await client.query(getAgents(userUid,agentId))).rows
        for (let i = 0; i < result.length;i++)
        {
          result[i].categories = (await client.query(getAgentsCategories(result[i].id))).rows
          result[i].positions = (await client.query(getAgentsPositions(result[i].id))).rows
    }
    return result
  }
  router.get('/get-agents', async (req, res) => {  
    const token =req.headers.authorization;
    console.log("🚀 ~ file: usersRouter.js ~ line 365 ~ router.get ~ token", token)
    
    const email = req.query.email;
    const uid = req.query.uid;
    const agentId = req.query.agentId;
    try {
      const isAuth = await isTokenValid(email, token)
      if (isAuth) {
       const result= await getAgentsById(uid,agentId)    
        res.send(agentId?result.filter((agent)=>agent.id===agentId):result)
      }
      else {
        res.status(401).send({status:401,message:'not authorization'})
      }
    } catch (err) {
      console.log(err)
      if (err.message = 'bad token')
        res.status(401).send({ status: 401, message: 'authorization not valid' })
      else
      res.status(404).send({status:404,message:'problem accrued'})
    }
    
  })
  router.delete('/delete-agent/:agentId/:userEmail', async (req, res) => {
    const agentId = req.params.agentId;
    const userEmail=req.params.userEmail;
    const token = req.headers.authorization;
    console.log("🚀 ~ file: usersRouter.js ~ line 392 ~ router.delete ~ token", token)
    
    try {
      const isAuth = await isTokenValid(userEmail, token)
      if (isAuth)
      {
        const result = (await client.query(removeAgent(agentId)))
        return res.send(result)
        }
    }
    catch (err) {
      console.log(err)
    }
  
  })
  router.post('/agent-scan/:agentId/:userEmail/:uid', async (req, res) => {
    const agentId = req.params.agentId;
    const userEmail = req.params.userEmail;
    const userUid = req.params.uid;
    const token = req.headers.authorization;
    try {
      const isAuth = await isTokenValid(userEmail, token)
      if (isAuth)
      {
        const agent = (await client.query(getAgents(userUid,agentId))).rows[0]      
        const result = await handleAgentScan(agent)
        console.log("🚀 ~ file: usersRouter.js ~ line 389 ~ router.post ~ result", result)
        
        return res.send(result)
      } else {
        res.status(404).send({code:404,message:err})
      }
    } catch (err) {
      console.log(err);
      res.status(404).send({code:404,message:err})
    }
  })
  router.get('/agent-last-scan/:agentId/:userEmail', async (req, res) => {
    const agentId = req.params.agentId;
    const userEmail = req.params.userEmail;
    
    const token = req.headers.authorization;
   
  
    try {
      const isAuth = await isTokenValid(userEmail, token)
      if (isAuth) {
        const userData = (await client.query(getUserLoginData(userEmail))).rows[0]
        console.log("🚀 ~ file: usersRouter.js ~ line 405 ~ router.get ~ userData", userData)
        console.log("🚀 ~ file: usersRouter.js ~ line 448 ~ router.get ~ isUserAgent(userData.uid, agentId)", isUserAgent(userData.uid, agentId))
  
        const isUserAgents = (await client.query(isUserAgent(userData.uid, agentId))).rows[0]
        console.log("🚀 ~ file: usersRouter.js ~ line 445 ~ router.get ~ isUserAgents", isUserAgents)
  
        if (isUserAgents) {
  
          const result = (await client.query(getLastScanResult(agentId)))
  
          res.send(result.rows)
        }
        else throw new Error('not user agent')
      }
    } catch (err) {
      console.log(err)
      res.status(404).send({ code: 404, message: err })
    }
  }
  )
module.exports = router;