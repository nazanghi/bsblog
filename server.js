// establish dependencies
const AppRouter = require('./routes/AppRouter')
const express= require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet= require('helmet')
const connection = require('./database/connection')
const path = require('path')

//establish PORT and express usage
const PORT = process.env.PORT || 1337
const app = express()
// initialize middleware
app.use(logger('dev'))
app.use(helmet({contentSecurityPolicy: false}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.disable('X-Powered-By')
app.use('/api', AppRouter)

app.get('*', (request, response) =>
    response.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    )

app.listen(PORT, async()=> {
    try {
        await connection
        console.log('Database connected')
        console.log(`App listening on port: ${PORT}`)
    } catch(error){throw new Error('Connection Error')}
})