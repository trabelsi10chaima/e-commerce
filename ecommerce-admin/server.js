const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const produtsRoutes = require('./routes/products')
const cors = require('cors');

const app = express()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true, dbName : 'Shoes'})
        .then(() => console.log('connection to DB is established'))
        .catch( (err) => console.error(err))

app.use(express.json())    
app.use(cors())    

app.use('/', produtsRoutes)

app.listen(process.env.PORT, () => console.log('Server is listening on port '+ process.env.PORT))