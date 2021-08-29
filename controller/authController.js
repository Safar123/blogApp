const User = require('../models/UserModel');
const catchAsync = require('./../middleware/asyncErrorHandler');
const {userSchemaValidation}= require('./../middleware/joiValidation');
const jwt = require('jsonwebtoken')

const jwtGenerateToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET_STRING,{
          expiresIn:process.env.JWT_EXPIRE_IN
     })
}

const sendJwtToken = (user, statusCode, res)=>{
     const token = jwtGenerateToken(user._id);
     const cookieOptions = {
          expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE_IN *24*60*60*1000),
          httpOnly:true
     }

     if(process.env.DEV_ENV==='PRODUCTION') cookieOptions.secure = true
     res.cookie('jwt', token, cookieOptions)

     user.password =undefined;
     
     res.status(statusCode).json({
          success: true,
          token,
          user: {
               user
          }
     })

}

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