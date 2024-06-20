
const mongoose = require("mongoose");  


const contactSchema = new mongoose.Schema({
    'name':{type:String,required:true},
    'email':{type:String,required:true,unique:true },
    'phone': Number,
    'subject': String,
    'message': String,
});

const Contacts = mongoose.model("Contact", contactSchema);

module.exports=Contacts;