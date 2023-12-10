const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const Bill = require('./models/Bill');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Create a new bill
app.post('/bills', async (req, res) => {
  try {
      const newBill = new Bill({
          billerName: req.body.billerName,
          amount: req.body.amount,
          dueDate: req.body.dueDate,
          category: req.body.category,
          status: req.body.status
      });
      await newBill.save();
      res.status(201).send(newBill);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Get all bills
app.get('/bills', async (req, res) => {
  try {
      const bills = await Bill.find({});
      res.status(200).send(bills);
  } catch (error) {
      res.status(500).send(error);
  }
});

// GET a single bill by ID
app.get('/bills/:id', async (req, res) => {
  try {
      const bill = await Bill.findById(req.params.id);
      if (!bill) {
          return res.status(404).send('Bill not found');
      }
      res.send(bill);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Update a bill
app.patch('/bills/:id', async (req, res) => {
  try {
      const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!bill) {
          return res.status(404).send();
      }
      res.send(bill);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Delete a bill
app.delete('/bills/:id', async (req, res) => {
  try {
      const bill = await Bill.findByIdAndDelete(req.params.id);
      if (!bill) {
          return res.status(404).send();
      }
      res.send(bill);
  } catch (error) {
      res.status(500).send(error);
  }
});

// ...additional routes for other models

module.exports = app;