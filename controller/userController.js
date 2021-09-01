const User = require('./../models/UserModel');
const catchAsync = require('./../middleware/asyncErrorHandler');
const ApiError = require('./../ClassHandler/ErrorClass');

const filterObj =(obj, ...allowedFields)=>{
     const newObj ={}
     Object.keys(obj).forEach(el=>{
          if(allowedFields.includes(el)) newObj[el]= obj[el]; 
     })
     return newObj;
}

exports.updateUserInfo = catchAsync(async (req,res,next)=>{

     if(req.body.password|| req.body.confirmPassword){
          return next(new ApiError('To change password please follow another routes', 400))
     }

     const allowedFilter = filterObj(req.body, 'name', 'email', 'userImage')

     const user = await User.findOneAndUpdate(req.user.id, allowedFilter, {
          new:true,
          runValidators:true
     })

     if(!user){
          return next(new ApiError ('Something went wrong while updating', 500))
     }
     res.status(200).json({
          success:true,
          data:{
               data:user
          }
     })

})

exports.getAllUser = catchAsync(async(req,res, next)=>{

     const user = await User.find();
     if(!user){
          res.status(200).send('No user yet')
     }
     res.status(200).json({
          success:true,
          data:{
               data:user
          }
     })
     
})