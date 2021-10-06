require("dotenv").config()
require('./config/db')
const express = require('express');
const cors = require('cors')

const app = express()

const authMiddleware = require('./middlewares/auth.middleware')

app.use(express.json());
app.use(cors());


//...import routes
const authRoutes = require('./routes/auth.routes');

app.use('/auth',authRoutes);

app.use(authMiddleware);

app.listen(process.env.PORT, ()=>{
    console.log(`server runing in port ${process.env.PORT}`)
})

process.on("SIGINT", ()=> {process.exit()})