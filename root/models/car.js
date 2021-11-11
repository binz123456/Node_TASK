
const Joi = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const {categorySchema} = require('./category');

const Car = mongoose.model('Cars',new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    
    minlength: 5,
    maxlength: 255
  },
  category: { 
      type: new mongoose.Schema({
         _id :String

      })

  },
  number: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  
  deleted: {
    type: Schema.Types.Boolean,
    index: true,
    default: false
  }
  
 
  
}));

function validateCar(car) {
  // const schema = {
  //   name: Joi.string().min(5).max(50).required(),
  //   number:Joi.string().min(5).max(50).required(),
  //   km_rate : Joi.string().min(5).max(50).required(),
  //   wait_time:Joi.string().min(5).max(50).required(),
  //   categoryId: Joi.string().required()
    
  // };

  // return Joi.validate(car, schema);


  const schema = Joi.object({

      name: Joi.string().min(5).max(50).required(),
      categoryId: Joi.string().required(),
      number:Joi.string().min(5).max(50).required(),
     
     
      
    
    })
  return schema.validate(car)




}

exports.Car = Car; 
exports.validate = validateCar;