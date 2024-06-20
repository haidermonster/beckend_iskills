const express = require("express"); 
const {
  getContact,
  getidContact,
  createContact,
  deleteContact,
  updateContact
}=require("../controllers/contact")
const router = express.Router();  




//get route for user
router.get('/', getContact);
//get route for single user
router.get('/:id', getidContact)
// post route
router.post("/", createContact)
//delete route
router.delete("/:id", deleteContact)

router.patch("/:id", updateContact);


module.exports = router;