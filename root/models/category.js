const Joi = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  km_rate: {      
    type: Number,
    required: true,
    trim: true, 
    
  },
  wait_rate: {
    type: Number,
    required: true,
    trim: true, 
    
  },
  deleted: {
    type: Schema.Types.Boolean,
    index: true,
    default: false
  }
});

const Category = mongoose.model('Category', categorySchema);




function validateCategory(category) {
 
  const schema = Joi.object({
    name: Joi.string().required(),
    km_rate:Joi.number().required(),
    wait_rate:Joi.number().required()
    
    })
  return schema.validate(category)

}

exports.categorySchema = categorySchema;
exports.Category = Category; 
exports.validate = validateCategory;