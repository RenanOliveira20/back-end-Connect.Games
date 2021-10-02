const mongoose = require('mongoose');
const connect = async () =>{
    const connection = await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`DataBase connected: ${connection.connections[0].name}` );
};
connect();