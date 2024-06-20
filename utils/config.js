const dotenv =require("dotenv");
dotenv.config();

const mongoose = require("mongoose");


async function dbConnection(){
    
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/iSkills")
    .then(()=>{
     console.log("Database connected");
 }).catch((error)=>{
     console.log(error)
 })
 
 }

 module.exports = dbConnection;