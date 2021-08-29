const express = require('express');
const blogRouter = express.Router();
const blogController = require('./../controller/blogController')

blogRouter.route('/')
.post(blogController.createBlog)
.get(blogController.getAllBlog);

blogRouter.route('/:id')
.get(blogController.singleBlog)
.patch(blogController.updateBlog)
.delete(blogController.removeBlog)

module.exports = blogRouter;