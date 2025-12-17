const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.allUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {users}
  });
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            status: "fail",
            message: "Please provide email and password"
        });
    }

    const usr = await User.findOne({email}).select("+password")
    if(!usr || !(await usr.correctPassword(password, usr.password))){
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password"
        });
    }

    const token = signToken(usr._id);
    res.status(200).json({
        status: "success",
        token,
        data: {
          userId: usr._id,
            email: usr.email,
            name: usr.name,
            role: usr.role
        }
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};