const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
    moduleCode: { type: String },
    category: {
        type: String,
        required: true,
        unique: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Ensure the category field is unique
categorySchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

// Indexing the category field
categorySchema.index({ category: 1 }, { unique: true });

// Ensure case-insensitive uniqueness
categorySchema.pre('save', function(next) {
    this.category = this.category.toLowerCase();
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
