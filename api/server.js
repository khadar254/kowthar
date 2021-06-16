import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import compression from 'compression'
import { keys } from './keys'

// api endpoints
import { authRoutes } from './routes/user'

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
mongoose.connect(
    keys.mongoUri,
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

app.use('/api/auth/', authRoutes)

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`server is running on port ${port}`))
