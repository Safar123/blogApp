const Blog = require('./../models/BlogModel');
const catchAsync = require('./../middleware/asyncErrorHandler');
const ApiError = require('./../ClassHandler/ErrorClass');
const {blogSchemaValidation} = require('./../middleware/joiValidation');


exports.createBlog = catchAsync(async (req,res, next)=>{

     const {error, value} = await blogSchemaValidation(req.body);
     if(error){
          const message= error.details[0].message
          return next (new ApiError(message, 422))
     }
     else if (value){
          const blog = await Blog.create({
               title:req.body.title,
               description:req.body.description,
               tag:req.body.tag
          })
    
          if(blog){
               res.status(201).json({
                    success:true,
                    data:{
                         data:blog
                    }
               })
          }
          else{
               return next (new ApiError(' Something went wrong creating document', 500))
          }
     }   
})

exports.getAllBlog = catchAsync(async (req, res, next)=>{

     const blogList = await Blog.find();
     if(blogList.length===0){

         return next(new ApiError('No document yet', 404))
     }
     else {
          res.status(200).json({
               success:true,
               data:{
                    documentNumber:blogList.length,
                    data:blogList
               }
          })
     }
})

exports.singleBlog = catchAsync(async (req, res, next)=>{

          const blog = await Blog.findById(req.params.id);
          if(!blog){
               res.status(404).send('No document for given Id')
          }
          else{
               res.status(200).json({
                    success:true,
                    data:{
                         
                         data: blog
                    }
               })
          }   
})

exports.removeBlog= catchAsync(async(req,res,next)=>{

          const blog = await Blog.findByIdAndDelete(req.params.id)

          if(!blog){
               res.status(400).json({
                    success:false,
                    message:'No document for given ID'
               })
          }
          else{
               res.status(203).json({
                    success:true,
               })
          }
})

exports.updateBlog = catchAsync (async (req, res, next)=>{

          const blog = await Blog.findByIdAndUpdate(req.params.id,
               req.body, 
              {new:true, runValidators:true} )

         if(!blog){
              res.status(400).send('No document for given ID')
         }
         else{
             res.status(200).json({
                  success:true,
                  data:{
                       data:blog
                  }
             }) 
         }     

     
})