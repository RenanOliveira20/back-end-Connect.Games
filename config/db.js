const mongoose = require('mongoose');

const connect = async () =>{
    const connect = await mongoose.connect('mongodb+srv://rldo_yaanks:renanyank123@cluster0.rx5tu.mongodb.net/project3?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`DataBase connected: ${connect.connections[0].name}` );
};


module.exports = connect