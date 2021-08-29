const express = require('express');
const userRouter = express.Router();
const authController = require('./../controller/authController');

userRouter.post('/signup', authController.signUpUser);

module.exports = userRouter;