const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        return await mongoose.connect(process.env.DB_URI).then(()=>console.log("Connected to DB"))
    }catch(e){
        console.log("Unable to connect to the database").then(()=>process.exit(1))
    }
}

module.exports = connectDB