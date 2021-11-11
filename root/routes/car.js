const {Car, validate} = require('../models/car'); 
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const cars = await Car.find().sort('name');
  res.send(cars);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  let car = new Car({ 
    name: req.body.name,
    category: {
        _id: category._id,
        
      },
   
    number: req.body.number,
    
    
    
  });
  car = await car.save();
  
  res.send(car);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const car = await Car.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.title,
        category: {
            _id: category._id,
            
          },
       
        number: req.body.number
        
        
    }, { new: true });

  if (!car) return res.status(404).send('The car with the given ID was not found.');
  
  res.send("updated successfully");
});

router.delete('/:id', async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);

  if (!car) return res.status(404).send('The car with the given ID was not found.');

  //  car.deleted = true;
  //  await car.save();

  res.send("deleted successfully");
});

router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) return res.status(404).send('The car with the given ID was not found.');

  res.send(car);
});

module.exports = router; 