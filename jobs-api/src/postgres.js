const { Pool, Client } = require('pg');
const  querys  = require('./querys/querys.js')
console.log(querys)
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
})

const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
})

client.connect();
// client.query(querys({attribute:"location_area",isAscending:false}, "tincidunt in"), (err, res) => {
//     if (err)
//         console.log(err);
//     else
//         console.log(res);
//     client.end();
    
// })

module.exports = client;