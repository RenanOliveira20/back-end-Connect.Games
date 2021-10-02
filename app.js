require("dotenv").config()
require('./config/db')
const express = require('express');
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());

//...import routes
const authRoutes = require('./middlewares/auth.routes')

//rotas

app.use('auth',authRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`server runing in port ${process.env.PORT}`)
})