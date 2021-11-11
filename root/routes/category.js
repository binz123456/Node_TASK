const {Category, validate} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const cats = await Category.find();
  res.send(cats);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
   if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
     name: req.body.name, 
     km_rate:req.body.km_rate,
     wait_rate:req.body.wait_rate
    });
  category = await category.save();
  
  res.send(category);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const cat = await Category.findByIdAndUpdate(req.params.id, {
     name: req.body.name,
     km_rate:req.body.km_rate,
     wait_rate:req.body.wait_rate
     }, {
    new: true
  });

  if (!cat) return res.status(404).send('The category with the given ID was not found.');
  
  res.send("updated successfully");
});

router.delete('/:id', async (req, res) => {
  const cat = await Category.findByIdAndRemove(req.params.id);

  if (!cat) return res.status(404).send('The category with the given ID was not found.');
  // cat.deleted = true;

  // await cat.save();

  res.send("deleted succesffully");
});

router.get('/:id', async (req, res) => {
  const cat = await Category.findById(req.params.id);

  if (!cat) return res.status(404).send('The cat with the given ID was not found.');

  res.send(cat);
});

module.exports = router;