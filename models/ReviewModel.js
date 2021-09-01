const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

     comments:{
          type:String,
          required:[true, 'Comment cannot be empty']
     },
     ratings:{
          type:Number,
          min:1,
          max:5
     },
     user:{
          type:mongoose.Schema.ObjectId,
          ref:'User'
     },
     blog:{
          type:mongoose.Schema.ObjectId,
          ref:'Blog'
     }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports= Review