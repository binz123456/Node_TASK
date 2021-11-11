const mongoose = require('mongoose');
const categories = require('./root/routes/category');
const customers = require("./root/routes/customer");
const rides =require("./root/routes/ride")
const cars = require('./root/routes/car');
const express = require('express');
const app = express();




mongoose.connect('mongodb://localhost/Node_Test_1')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());

app.use('/api/category', categories);

app.use('/api/cars', cars);

app.use('/api/customers', customers);

app.use('/api/rides', rides);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


