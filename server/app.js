const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.load()

const app = express()

// allow cross-origin requests
app.use(cors())

// connect to your mlab database
// use proper USER and PASS in a .env file
mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASS}.mlab.com:31559/gql-jander`)
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})