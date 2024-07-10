// models/expense.model.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  moduleCode: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    name: { type: String, required: true },
    id: { type: String, required: true }
  },
  subcategory: {
    name: { type: String, required: true },
    id: { type: String, required: true }
  },
  amount: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
