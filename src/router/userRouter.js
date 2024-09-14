const express = require("express");
const { userController } = require("../controllers");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

//Get /api/user
userRouter.get('/',
  authMiddleware.isAuth,
  userController.getUserInfo
);

module.exports = userRouter;
