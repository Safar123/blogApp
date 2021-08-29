const User = require('../models/UserModel');
const catchAsync = require('./../middleware/asyncErrorHandler');
const {userSchemaValidation}= require('./../middleware/joiValidation');
const sendJwtToken =require('./../utils/jwtHandler');

exports.signUpUser = catchAsync(async (req, res, next) => {

     const {error, value} = await userSchemaValidation(req.body);
     if(error){
          res.status(422).send(error.details[0].message);
     }
    else if(value)
     {
          const checkUser = await User.findOne({ email: req.body.email })
          if (checkUser) {
               res.status(400).send(`User with ${checkUser.email} already exist.`)
          }
          else {
               const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword,
                    userImage: req.body.userImage
               })
               if (user) {
                  sendJwtToken(user, 201, res)
               }
               else {
                    res.status(500).send('Error creating user!!!!!!')
               }
          }
     }
})