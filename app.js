const express = require('express');

const connectDb = require('./config/db');

connectDb();

const app = express()

app.listen(5000, ()=>{
    console.log('server runing in port 5000')
})