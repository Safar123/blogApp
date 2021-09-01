const express = require('express');
const blogRouter = express.Router();
const blogController = require('./../controller/blogController')
const authController= require('./../controller/authController')
const reviewRoute = require('./../routes/reviewRoutes')

blogRouter.use('/:blogId/reviews', reviewRoute);

blogRouter.route('/')
.post(authController.protectRoute, blogController.setUserID ,blogController.createBlog)
.get(blogController.getAllBlog);

blogRouter.route('/:id')
.get(blogController.singleBlog)
.patch(blogController.updateBlog)
.delete(blogController.removeBlog)

module.exports = blogRouter;