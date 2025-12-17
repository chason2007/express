const jwt = require('jsonwebtoken');

const users = [
  {
    id: 1,
    name: "chase",
    email: "chase@chase.com",
    password: "abc.123",
    confirmPassword: "abc.123",
    role: "admin",
  },
  {
    id: 2,
    name: "bala",
    email: "bala@chase.com",
    password: "bala.123",
    confirmPassword: "bala.123",
    role: "user",
  },
];

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.allUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: users
  });
};

exports.login = (req, res) => {
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
    const user = users.find((u)=>u.email===email && u.password===password)
    if(!user){
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password"
        });
    }

    //generate token
    const token = signToken(user.id);
    res.status(200).json({
        status: "success",
        token,
        data: {
            email: user.email,
            name: user.name,
            role: user.role
        }
    });
};

exports.signup = (req, res) => {

};