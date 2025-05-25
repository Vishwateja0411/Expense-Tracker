const mongoose = require('mongoose');

// Define the schema for the expense model
// This schema defines the structure of the expense documents in the MongoDB collection
const expenseSchema =  mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Expense', expenseSchema);