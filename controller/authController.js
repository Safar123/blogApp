const User = require('../models/UserModel');
const catchAsync = require('./../middleware/asyncErrorHandler');
const {userSchemaValidation}= require('./../middleware/joiValidation');
const {sendJwtToken, verifyToken} =require('./../utils/jwtHandler');
const ApiError = require('./../ClassHandler/ErrorClass');

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

exports.logInUser = catchAsync(async(req, res, next)=>{
     const {email, password} = req.body;
     if(!email || !password){
          return next (new ApiError('Email and password is required field', 400 ))
     }

     const user = await User.findOne({email}).select('+password');

     if(!user || ! await user.checkPasswordValid(password, user.password))
     {
          return next(new ApiError(`Email or password didn't matched`))
     }
     sendJwtToken(user, 200, res)
})

exports.protectRoute = catchAsync(async (req, res, next)=>{
     let token;
     
     //?setting authorization headers and initial of headers
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
          token = req.headers.authorization.split(' ')[1]
     }
     //?testing if user is logged in and has token
     if(!token){
          return next(new ApiError ('You need to login to access this route', 401))
     }
     //?verifiying token 
     const decoded = await verifyToken(token);

     //?check user still exist
     const existingUser = await User.findById(decoded.id)
     if(!existingUser){
          return next(new ApiError('User with bearer token exist no longer', 401))
     }
     req.user=existingUser;
     next();

})