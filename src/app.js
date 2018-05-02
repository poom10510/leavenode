import routes from './routes'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// const mconfig = 'mongodb://localhost/test'
const mconfig = 'mongodb://leave01:leaveleave@cluster0-shard-00-00-8go1q.mongodb.net:27017,cluster0-shard-00-01-8go1q.mongodb.net:27017,cluster0-shard-00-02-8go1q.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const connection = mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || mconfig)
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.')
    process.exit(1)
})

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', routes)

export default app