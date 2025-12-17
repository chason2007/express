const express = require("express");

const authRouter = express.Router();

authRouter.route("/login").post()
authRouter.route("/signup").post()
authRouter.route("/getAllUsers").get();

module.exports = authRouter;
