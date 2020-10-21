const express = require('express');

const client  = require('../postgres');
const querys = require('../querys/querys');
const router = new express.Router();
// const client = new Client({
//     connectionString: process.env.CONNECTION_STRING,
// })

// client.connect();
router.get('/jobs', async (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        try
        {
            client.query(querys()).then((value)=>res.send(value))
         }
        catch (err) {
            res.send({
                status: 500,
                message:err.message}) 
        }
    }
    else {
        const possibaleSearchAttributes=["sortBy","searchWord","isSenorSearch","filters"]
        
        try
        {
 

            for (let query in req.body)
            {if (!possibaleSearchAttributes.includes(query))
              return res.send({
                status: 500,
                  message: "query not legal"
              })
            }
            console.log(querys(req.body));
            client.query(querys(req.body)).then((value)=>res.send(value))
         }
        catch (err) {
            res.send({
                status: 500,
                message:err.message}) 
        }
    }
})

module.exports = router;