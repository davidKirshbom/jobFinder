const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT;
const jobsRouter = require('./router/jobsRouter');
const usersRouter = require('./router/usersRouter');
const utilsRouter = require('./router/utilsRouter');
const publicDirectoryPath = path.join(__dirname, '../public')
const app = express();
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cors())
app.use('/jobs',jobsRouter)
app.use('/users', usersRouter)
app.use('/utils',utilsRouter)
app.listen(port, () => {
    console.log('Server connected, port:',port)
})