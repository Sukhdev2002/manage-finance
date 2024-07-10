// models/category.model.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    moduleCode: { type: String },
    category: {
        type: String,
        required: true
    },
    subcategories: {
        type: [String],
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
