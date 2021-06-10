const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const compression = require('compression')
require('dotenv').config()

// create express app
const app = express()
const server = http.Server(app)

const corsOptions = {
    origin: 'http://localhost:3000',
}

// express middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept'
    )

    next()
})

// use compression
app.use(compression())

//mongodb connection
const dbUrl = require('./keys').mongoUri

mongoose.connect(
    dbUrl,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) {
            console.log({ error })
            return
        }
        console.log('Mongodb is running ....')
    }
)

const port = process.env.PORT || 8000

server.listen(port, () => console.log(`server is running on port ${port}`))
