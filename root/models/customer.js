const Joi = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: Number,
    required: true,
    
    maxlength:10
  },
  fromLoc: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
   
  },
  toLoc: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    
  },
  total_dis: {
    type: Number,
    required: true,
    
    
  },
  wait_t: {
    type: Number,
    required: true,
    
  },
  deleted: {
    type: Schema.Types.Boolean,
    index: true,
    default: false
  }
  
  
}));

function validateCustomer(customer) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     phone: Joi.string().min(5).max(50).required(),
//     fromLoc:Joi.string().min(5).max(50).required(),
//     toLoc:Joi.string().min(5).max(50).required()
//   };

//   return Joi.validate(customer, schema);


const schema = Joi.object({

    name: Joi.string().min(5).max(50).required(),
    phone:Joi.string().min(5).max(50).required(),
    fromLoc : Joi.string().min(5).max(50).required(),
    toLoc:Joi.string().min(5).max(50).required(),
    total_dis : Joi.number().required(),
    wait_t :Joi.number().required()
    
    
  
  })
return schema.validate(customer)

}

exports.Customer = Customer; 
exports.validate = validateCustomer;