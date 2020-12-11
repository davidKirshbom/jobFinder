const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT;
const testRoute=require('./router/router')
const jobsRouter = require('./router/jobsRouter');
const usersRouter = require('./router/usersRouter');
const utilsRouter = require('./router/utilsRouter');
const agentsRouter=require('./router/agentsRouter')
const {logger}=require('./utils/middlewares')
const publicDirectoryPath = path.join(__dirname, '../public')
const app = express();
require('./utils/agentsSearch')
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cors())
app.use(logger)
app.use('/',testRoute)
app.use('/jobs',jobsRouter)
app.use('/users', usersRouter)
app.use('/utils', utilsRouter)
app.use('/agents',agentsRouter)
app.listen(port, () => {
    console.log('Server connected, port:',port)
})