// services/category.service.js
const Category = require('../models/category.model');
const utils = require('../utils/utils');
exports.getCategoriesByUser = async (req) => {
    try {
        let query = utils.buildQuery(req.user.userId, req.query);
        return await Category.find(query);
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};

exports.addCategory = async (data) => {
    try {
        
       
        const newCategory = new Category(data);
        let CategoryData =  await newCategory.save();
        return CategoryData;
    } catch (error) {
        throw new Error('Error adding category: ' + error.message);
    }
};

exports.updateCategory = async (id, category, userId) => {
    try {
        const categoryData = await Category.findOneAndUpdate({ _id: id, userId  }, { category }, { new: true });
        if (!categoryData) {
            throw new Error('Category not found or unauthorized');
        }
        return categoryData;
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};

exports.deleteCategory = async (id, userId) => {
    try {
        const result = await Category.deleteOne({ _id: id, userId: userId });
        if (result.deletedCount === 0) {
            throw new Error('Category not found or unauthorized');
        }
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};
