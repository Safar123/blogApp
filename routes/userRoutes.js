const express = require('express');
const userRouter = express.Router();
const authController = require('./../controller/authController');

userRouter.post('/signup', authController.signUpUser);
userRouter.post('/login', authController.logInUser);

module.exports = userRouter;