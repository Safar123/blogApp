const User = require('../models/UserModel');
const catchAsync = require('./../middleware/asyncErrorHandler');
const {userSchemaValidation}= require('./../middleware/joiValidation');

exports.signUpUser = catchAsync(async (req, res, next) => {

     const result = await userSchemaValidation(req.body);
     if(result.error){
          res.status(422).send(result.error.details[0].message);
     }
     else{
          const checkUser = await User.findOne({ email: result.email })
          if (checkUser) {
               res.status(400).send(`User with ${result.email} already exist.`)
          }
          else {
               const user = await User.create({
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    confirmPassword: result.confirmPassword,
                    userImage: result.userImage
               })
               if (user) {
                    res.status(201).json({
                         success: true,
                         data: {
                              data: user
                         }
                    })
               }
               else {
                    res.status(500).send('Error creating user!!!!!!')
               }
          }
     }
})