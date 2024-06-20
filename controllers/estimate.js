 
const Estimates = require("../models/estimate");
const mongoose = require("mongoose");  



//get route for user

let getEstimate = async (req, res) => {
  try {
    const estimates = await Estimates.find({});
    res.status(200).json({ data: estimates });
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

//get route for single user

let getidEstimate =async (req, res) =>{
  try {
    const id =  req.params.id;
    if(!mongoose.isValidObjectId(id)){
    return res.status(500).json({ message: "Invalid id" })
    }
    const estimate = await Estimates.findOne({ _id: id })
    
    if(!estimate){
    return res.status(404).json({ message: "estimate not found" })
    }
      res.status(200).json({ data: estimate });
} catch (error) {
    res.status(500).json({ message:error.message })
}
}

// post route
let createEstimate = async(req, res) => {
  try {
    const estimate = req.body;


    const Newestimate =new Estimates(estimate);
  await Newestimate.save();
    res.status(200).json({ data: Newestimate });

   } catch (error) {
    res.status(500).json({ message: error.message })
   }
}




//delete route

let deleteEstimate = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({message:"Invalid id"})
    }

  
    const estimate = await Estimates.deleteOne({ _id: id });
    if (!estimate) {
      return res.status(404).json({ message: "the object is not exist" });
    }
    res.status(200).json({ message: "estimate is deleted", data: estimate });
    
 } catch (error) {
    res.status(200).json({message:error.message})
 }
}


let updateEstiamte =async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId) {
    res.json({ message: "the object id is not valid" });
  }
  const estimateUpdate = req.body;

  const estimate = await Estimates.findByIdAndUpdate({ _id: id }, estimateUpdate);

  res.status(200).json({ message: "estimate infos updated", data: estimate });
}



module.exports = {
  getEstimate,
  getidEstimate,
  createEstimate,
  deleteEstimate,
  updateEstiamte
};