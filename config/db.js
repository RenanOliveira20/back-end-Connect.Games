const mongoose = require('mongoose');
const connect = async () =>{
    const connection = await mongoose.connect('mongodb+srv://dbRenan:heineken@project3.ly9et.mongodb.net/project?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`DataBase connected: ${connection.connections[0].name}` );
};
connect()