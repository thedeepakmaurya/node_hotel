const mongoose = require('mongoose')

// define the mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels'

// setup mongoDB connection
mongoose.connect(mongoURL, {
})

// get the database instance
const db = mongoose.connection;

// define event listeners on database connection

db.on('connected', () => {
    console.log('MongoDB connected')
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

db.on('error', (err) => {
    console.log('MongoDB connection error: ', err)
})


module.exports = db;