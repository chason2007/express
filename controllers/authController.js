const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const users = require('../models/userModel')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.allUsers = async (req, res) => {
  const users = await users.find();
  res.status(200).json({
    status: "success",
    data: {users}
  });
};

exports.login = async (req, res) => {
    //1. get email and pass
    const {email, password} = req.body;

    //check input
    if(!email || !password){
        return res.status(400).json({
            status: "fail",
            message: "Please provide email and password"
        });
    }

    //check user exists
    const usr = await users.findOne({email}).select("+password")
    //const user = users.find((u)=>u.email===email && u.password===password)
    if(!usr && !(await usr.correctPassword(usr.password, password))){
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password"
        });
    }

    //generate token
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
};

exports.signup = async (req, res) => {
  // const { name, email, password, confirmPassword, role } = req.body;
  
  // //check if user exists
  // const existingUser = users.find((u) => u.email === email);
  //   if (existingUser) {
  //   return res.status(400).json({
  //     status: "fail",
  //     message: "User already exists"
  //   });
  // }

  // const newUser = {
  //   id: users.length + 1,
  //   name,
  //   email,
  //   password,
  //   role: role || "user"
  // };
  
  // users.push(newUser);

  const newUser = await User.create(req.body);
  
  const token = signToken(newUser.id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    }
  });
};