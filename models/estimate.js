
const mongoose = require("mongoose");  


const estimateSchema = new mongoose.Schema({
    'name':{type:String,required:true},
    'email':{type:String,required:true,unique:true },
    'select': String,
    'duration': String, 
    'phone': Number,
    'budget': String,
    'message': String,
});

const Estimates = mongoose.model("estimate", estimateSchema);


module.exports = Estimates;