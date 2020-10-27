const express = require('express');

const client  = require('../postgres');
const {searchJob,searchJobCount} = require('../querys/querys');
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

module.exports = router;