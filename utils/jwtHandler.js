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
module.exports = sendJwtToken;