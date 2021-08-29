const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
     title:{
          type:String,
          required:[true, 'Please provide title for blog'],
          minlength:[5, 'Title must be 5 character long'],
          maxlength:[75, 'Title muse be less than 75 character long']
     },

     description:{
          type:String,
          required:[true, 'Blog must have description'],
          minlength:[50, 'Description must be 50 charcater lon']
     },

     createdAt:{
          type:Date,
          default:Date.now()
     },

     tag:{
          type:String,
          required:[true, 'Tag is required'],
          minlength:[3, 'Tag must be three character long']
     }
},
{
     toJSON: { virtuals: true },
     toObject: { virtuals: true }
})

blogSchema.virtual('wordCount').get(function(next){
     return this.description.split(' ').length;
     next()
})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog