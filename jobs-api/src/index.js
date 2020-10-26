const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT;
const jobsRouter = require('./router/jobsRouter');
const publicDirectoryPath = path.join(__dirname, '../public')
const app = express();
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cors())
app.use(jobsRouter)

app.listen(port, () => {
    console.log('Server connected, port:',port)
})