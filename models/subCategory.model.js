const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleCode: { type: String },
    subcategory: {
        type: String,
        required: true,
        unique: true
    }
});

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;




