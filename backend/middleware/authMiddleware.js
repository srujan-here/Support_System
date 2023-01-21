const jwt = require("jsonwebtoken");
const asynHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asynHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //get user form token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(404);
      throw new Error("Not Authorised");
    }
  }
  if (!token) {
    res.status(404);
    throw new Error("Not Authorised");
  }
});

module.exports = { protect };
