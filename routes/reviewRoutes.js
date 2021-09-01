const express = require('express');
const reviewRouter = express.Router({mergeParams:true});
const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');

reviewRouter.route('/').post(authController.protectRoute, reviewController.addReview);
reviewRouter.get('/user', authController.protectRoute, reviewController.getUserReview);

reviewRouter.route('/:id')
.delete(authController.protectRoute, reviewController.removeReview)
.patch(authController.protectRoute, reviewController.updateReview)

module.exports= reviewRouter;
