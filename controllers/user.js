
const Users = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Tokens = require('../models/token');





//get route for user


let getUsers = async (req, res) => {
  try {
    // Extract token from authorization header
  

    let id = req.body.id;
    const user = await Users.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.userType === "admin") {
      // Fetch all users if the user is an admin
      const users = await Users.find({});
      return res.status(200).json({ data: users });
    } else {
      return res.status(403).json({ message: "Forbidden, you don't have access to this resource" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get route for single user


let getidUsers = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ message: "Invalid id" })
    }
    const user = await Users.findOne({ _id: id })

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//Signin

let userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist against this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d", audience: "web_app" },
      async (err, token) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        const tokenData = new Tokens({
          userId: user._id,
          token: token,
          status: 'valid' // Make sure to add the status field
        });

        await tokenData.save();

        res.status(200).json({ message: "Signin success", user: { name: user.name, email: user.email, token: token } });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//post route

let createUsers = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({ message: err.message })
      }

      // console.log(user);

      const user = new Users({ name, email, password: hash, userType });
      await user.save();

      if(user){

       return res.status(201).json({ message: "user created", user: { _id: user._id, name: user.name, email: user.email } });

      }else{

        return res.status(500).json({ message: "user not created" });

      }

    })

  } catch (error) {
    console.error(error.message); // Log the error for debugging
    if (error.name === "ValidationError") { // Handle Mongoose validation errors
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: "Validation error", errors: validationErrors });
    }
    res.status(500).json({ message: "Server Error" }); // Handle other errors gracefully
  }
}

//delete route
let deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: "Invalid id" })
    }


    const user = await Users.deleteOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "the object is not exist" });
    }
    res.status(200).json({ message: "buyer is deleted", data: user });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



let updateUsers = async (req, res) => {
  try {

      const userUpdate = req.body;
      const id= req.body.id;
      const user = await Users.findByIdAndUpdate({ _id: id }, userUpdate);
      res.status(200).json({ message: "user updated", data: user });


  } catch (error) {
      res.status(500).json({ message: error })
  }
}

module.exports = {
  getUsers,
  getidUsers,
  createUsers,
  deleteUsers,
  updateUsers,
  userSignin
};


