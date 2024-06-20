
const Contacts = require("../models/contact");
const mongoose = require("mongoose");  






let getContact = async (req, res) => {

  try {
    const contacts = await Contacts.find({});
    res.status(200).json({ data: contacts });
} catch (error) {
    res.status(500).json({ message: error.message });
}

}

//get route for user


//get route for single user

let getidContact =async (req, res) =>{
  try {
    const id =  req.params.id;
    if(!mongoose.isValidObjectId(id)){
    return res.status(500).json({ message: "Invalid id" })
    }
    const contact = await Contacts.findOne({ _id: id })
    
    if(!contact){
    return res.status(404).json({ message: "contact not found" })
    }
      res.status(200).json({ data: contact });
} catch (error) {
    res.status(500).json({ message:error.message })
}
}




// post route

let createContact = async(req, res) => {
  try {
    const contact = req.body;


    const Newcontact =new Contacts(contact);
   await Newcontact.save();
    res.status(200).json({ data: Newcontact });

   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}


//delete route

let deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({message:"Invalid id"})
    }

  
    const contact = await Contacts.deleteOne({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: "the object is not exist" });
    }
    res.status(200).json({ message: "buyer is deleted", data: contact });
    
 } catch (error) {
    res.status(200).json({message:error.message})
 }
}


let updateContact =async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId) {
    res.json({ message: "the object id is not valid" });
  }
  const contactUpdate = req.body;

  const contact = await Contacts.findByIdAndUpdate({ _id: id }, contactUpdate);

  res.status(200).json({ message: "user infos updated", data: contact });
}



module.exports = {
  getContact,
  getidContact,
  createContact,
  deleteContact,
  updateContact
};