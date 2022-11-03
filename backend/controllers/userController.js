const asynHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt =require("jsonwebtoken");
//@desc Register new user
//@route api/users
//access Public
const registerUser = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new error("please include all the fields");
  }
  //find user already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new error("invalid user details");
  }

  res.send("reister user");

  //find if user is already registered
});

//@desc login user
//@route api/users
//access Public

const loginUser = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id)

    });
  } else {
    res.status(401);
    throw new Error("invalid credentials");
  }
});

const generateToken =(id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports = {
  registerUser,
  loginUser,
};
