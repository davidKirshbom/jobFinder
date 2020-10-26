const express = require('express');

const client  = require('../postgres');
const {searchJob,getPositionsByJobId} = require('../querys/querys');
const router = new express.Router();
// const client = new Client({
//     connectionString: process.env.CONNECTION_STRING,
// })

// client.connect();


router.get('/jobs', async (req, res) => {
   console.log(req.query)
    if (Object.keys(req.query).length === 0)
    {
        try
        {
           
            client.query(searchJob()).then((value) => {
              
                 res.send(value); 
            })
         }catch (err) {
            res.send({
                status: 500,
                message:err.message}) 
        }
    }
    else {
        const possibaleSearchAttributes = ["resultOffset","openJobsOnly","resultsLimit", "sortBy", "searchWord", "isSenorSearch", "job_type","positions","location_area"]
        console.log(searchJob(req.query))
        try {
            for (let query in req.query) {
                if (!possibaleSearchAttributes.includes(query))
                    return res.send({
                        status: 500,
                        message: "query not legal"
                    })
            }
            
            client.query(searchJob(req.query)).then(async (value) => {
                console.log(value.rows)
                return res.send(value.rows)
            })
        }
        catch (err) {
            res.send({
                status: 500,
                message:err.message}) 
        }
    }
})

module.exports = router;