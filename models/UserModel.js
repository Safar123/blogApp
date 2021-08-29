const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
     name:{
          type:String,
          required:[true, 'Please provide user name'],
          minlength:[3, 'Name must be 3 character long'],
          maxlength:[50, 'Name must be less than 50 character']
     },
     email:{
          type:String,
          required:[true, 'Please provide valid email address'],
          unique:true, 
     },
     password:{
          type:String,
          required:[true, 'Please set password'],
          minlength:[8, 'Password must be 8 character long'],
          select:false
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

userSchema.pre('save', async function(next){
     if(!this.isModified('password')) return next();
     this.password = await bcrypt.hash(this.password, 12);
     this.confirmPassword = undefined;
     next();
})

userSchema.methods.checkPasswordValid = async function(toCheckPassword, comparedWith){
     return await bcrypt.compare(toCheckPassword, comparedWith)
}


const User = mongoose.model('User', userSchema);
module.exports = User;