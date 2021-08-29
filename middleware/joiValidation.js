const Joi = require('@hapi/joi')

function userSchemaValidation(data) {

 const schema =Joi.object({
     name:Joi.string().required().min(3).max(50),
     email:Joi.string().email().required().trim().lowercase(),
     password: Joi.string().min(3).max(15).required().label('Password'),
     confirmPassword: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
})
return schema.validate(data)
}


module.exports ={
     userSchemaValidation
}