const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Tokens = require('../models/token');

dotenv.config();

const checkAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token is missing" });
    }
    token = token.split(" ")[1];

    console.log(`Received token: ${token}`);

    const tempToken = await Tokens.findOne({ token: token });

    // Log tempToken for debugging
    console.log(`Database token: ${tempToken}`);

    // Check if tempToken is null
    if (!tempToken) {
      return res.status(401).json({ message: "Token not found" });
    }

    if (tempToken.status === "invalid") {
      return res.status(401).json({ message: "Token is invalid" });
    }

    console.log(`Verified token: ${token}`);

    jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        return res.status(500).json({ error: err.message, message: "Token is not valid" });
      }
      req.body.id = authData.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { checkAuth };
