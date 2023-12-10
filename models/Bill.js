// models/Bill.js

const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    // Define the schema fields here
    billerName: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    // Include a reference to the User if needed
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
