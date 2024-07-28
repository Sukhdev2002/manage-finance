// services/subCategory.service.js
const subCategory = require('../models/subCategory.model');
const utils = require('../utils/utils');
exports.getsubCategoriesByUser = async (req) => {
    try {
        let query = utils.buildQuery(req.user.userId, req.query);
        return await subCategory.find(query);
    } catch (error) {
        throw new Error('Error fetching subCategories: ' + error.message);
    }
};

exports.addsubCategory = async (data) => {
    try {
        const newsubCategory = new subCategory(data);
        let subCategoryData =  await newsubCategory.save();
        return subCategoryData;
    } catch (error) {
        throw new Error('Error adding subCategory: ' + error.message);
    }
};

exports.updatesubCategory = async (id, subcategory, category, userId) => {
    try {
        const subCategoryData = await subCategory.findOneAndUpdate({ _id: id, userId,category }, { subcategory }, { new: true });
        if (!subCategoryData) {
            throw new Error('subCategory not found or unauthorized');
        }
        return subCategoryData;
    } catch (error) {
        throw new Error('Error updating subCategory: ' + error.message);
    }
};

exports.deletesubCategory = async (id, userId) => {
    try {
        const result = await subCategory.deleteOne({ _id: id, userId: userId });
        if (result.deletedCount === 0) {
            throw new Error('subCategory not found or unauthorized');
        }
    } catch (error) {
        throw new Error('Error deleting subCategory: ' + error.message);
    }
};
