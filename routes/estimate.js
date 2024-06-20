const express = require("express"); 
const {
  getEstimate,
  getidEstimate,
  createEstimate,
  deleteEstimate,
  updateEstiamte
}=require("../controllers/estimate")
const router = express.Router();  

//get route for user
router.get('/', getEstimate);

//get route for single user
router.get('/:id', getidEstimate)

// post route
router.post("/", createEstimate)

//delete route

router.delete("/:id", deleteEstimate)

router.patch("/:id", updateEstiamte);

module.exports = router;