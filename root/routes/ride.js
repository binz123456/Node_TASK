const {Ride, validate} = require('../models/ride'); 
const { Car } = require('../models/car');
const {Customer} = require('../models/customer'); 
const {Category} = require("../models/category");



const mongoose = require('mongoose');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const rides = await Ride.find();
  res.send(rides);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  

  let ride = new Ride({ 
    customer: {
      _id: customer._id, 
       total_dis:customer.total_dis,
       wait_t :customer.wait_t
      
    },
    category: {
      _id: category._id,
      km_rate: category.km_rate,
      wait_rate:category.wait_rate
    },
    // rideFee:car.k m_rate * ride.total_dis + car.wait_time * ride.wait_t
     rideFee: (customer.total_dis * category.km_rate) + (customer.wait_t * category.wait_rate)

    
  });
  ride = await ride.save();

  
  
  
  res.send(ride);
});

router.get('/:id', async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride) return res.status(404).send('The ride with the given ID was not found.');
  res.send(ride);

});

  


module.exports = router; 