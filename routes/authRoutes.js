const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.route("/login").post(authController.login)
authRouter.route("/signup").post(authController.signup)
authRouter.route("/getAllUsers").get(authController.allUsers);

module.exports = authRouter;
