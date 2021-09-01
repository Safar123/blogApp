const Review = require('./../models/ReviewModel');
const catchAsync = require('./../middleware/asyncErrorHandler')
const ApiError = require('./../ClassHandler/ErrorClass')

exports.addReview = catchAsync(async (req,res,next)=>{
   
     if(!req.body.user) req.body.user = req.user.id;
     const newReview = await Review.create(req.body);
     if(!newReview){
          return next(new ApiError('Something went wrong while creating reviews', 500))
     }
     res.status(201).json({
          success:true,
          data:{
               data: newReview
          }
     })
})

exports.getUserReview = catchAsync(async (req,res,next)=>{
     const userReview = await Review.find({user:req.user.id})
     if(!userReview){
          return next(new ApiError('You dont have any comments yet', 200))
     }
     res.status(200).json({
          success:true,
          totalReview:userReview.length,
          data:{
               data:userReview
          }
     })
})

exports.removeReview = catchAsync (async(req,res,next)=>{
     const userReview = await Review.find({user:req.user.id});
     if(userReview != req.user.id){
          return next(new ApiError('You cannot delete someone else review'))
     }
     const delReview = await Review.findByIdAndDelete(req.params.id);
     if(!delReview){
          return next (new ApiError('No document for given id', 400))
     }
     res.status(203).json({
          success:true
     })
})

exports.updateReview = catchAsync (async(req,res, next)=>{
     const userReview = await Review.find({user:req.user.id})
     if(userReview!= req.user.id){
          return next(new ApiError ('You cannot update someone else review'))
     }
     const reviewUpdate = await Review.findByIdAndUpdate(req.params.id, req.body, {
          new:true,
          runValidators:true
     });
     if(!reviewUpdate){
          return next(new ApiError('No documents for given id'))
     }
     res.status(200).json({
          success:true,
          data:{
               data:reviewUpdate
          }
     })
})
