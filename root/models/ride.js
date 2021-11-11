const Joi = require('joi');
const mongoose = require('mongoose');

//defining the shape of the rental document
const Ride = mongoose.model('Ride', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      
      total_dis: {
        type: Number,
        required: true,
        
        
      },
      wait_t: {
        type: Number,
        required: true,
        
      }
          
    }),  
    required: true
  },
  category: {
    type: new mongoose.Schema({
        km_rate: {
            type: String,
            required: true,
            trim: true, 
           
          },
          wait_rate: {
            type: String,
            required: true,
            trim: true, 
            
          }
    }),
    required: true
  },
 
  
  rideFee: { 
    type: Number, 
    min: 0
  },
  
}));

function validateRide(ride) {
//   const schema = {
//     customerId: Joi.string().required(),//these propertiesbare client send sti the server
//    
//   };

//   return Joi.validate(rental, schema);

const schema = Joi.object({

    customerId: Joi.string().required(),
    categoryId: Joi.string().required()
    
    
  
  })
return schema.validate(ride)
}

exports.Ride = Ride; 
exports.validate = validateRide;