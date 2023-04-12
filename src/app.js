const express = require("express")
require('dotenv').config()
const { port } = require('../config')

const productRouter = require('./products/products.router')

const db = require('./utils/database')
const app = express()


//? Validar la conexión 

db.authenticate()
    .then(() => console.log('Database Authenticated!'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced!'))
    .catch(err => console.log(err))

//? conexión

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Server OK', 
        myMessage: process.env.MESSAGE, 
        myPort: process.env.PORT
    })
})

app.use('/api/v1/products', productRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})