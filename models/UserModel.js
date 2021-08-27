const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name:{
          type:String,
          required:[true, 'Please provide user name'],
          minlength:[3, 'Name must be 3 character long'],
          maxlength:[50, 'Name must be less than 50 character']
     },
     email:{
          type:String,
          require:[true, 'Please provide valid email address']
     },
     password:{
          type:String,
          required:[true, 'Please set password'],
          minlength:[8, 'Password must be 8 character long']
     },
     confirmPassword:{
          type:String,
          required:[true, 'Please provide matching password'],
          minlength:[8, 'Confirm password must be 8 character long and same as Password']
     },
    userImage:{
         type:String,  
    },
    role:{
         type:String,
         enum:['user', 'admin'],
         default:'user'
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;