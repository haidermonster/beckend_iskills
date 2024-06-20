const express = require("express"); 
const {
  getUsers,
  getidUsers,
  createUsers,
  deleteUsers,
  updateUsers,
  userSignin
}=require("../controllers/user")
const router =express.Router();

const {checkAuth} = require('../middlewares/auth')


//get route for user
router.get('/',checkAuth ,getUsers);

//get route for single user
router.get('/:id', getidUsers)

//post route
router.post("/signup", createUsers);

router.post("/signin", userSignin);
//delete route

router.delete("/:id", deleteUsers)

router.patch("/profile/",checkAuth  ,updateUsers);

module.exports = router;


