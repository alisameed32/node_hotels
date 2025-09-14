const mongoose = require('mongoose');

// Define the mongodb URL Connection

const mongoURL = 'mongodb://localhost:27017/hotels';

// Set Up the MongoDB Connection

mongoose.connect(mongoURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Connected to MongoDB Server")
})

db.on('error', (err)=>{
    console.log("MongoDB connection err: ", err)
})

db.on('disconnected', ()=>{
    console.log("MongoDB Server disconnected")
})




module.exports = db;