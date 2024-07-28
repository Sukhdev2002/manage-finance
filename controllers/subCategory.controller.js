// controllers/subCategory.controller.js
const subCategoryService = require('../services/subCategory.service');
const logger = require("../logger/api.logger");



exports.getsubCategories = async (req, res) => {
    try {
        
        const subCategories = await subCategoryService.getsubCategoriesByUser(req);
        return subCategories;
    } catch (error) {
        logger.error(`Error fetching subCategories: ${error.message}`);
        throw new Error('Error fetching subCategories');
    }
};



exports.addsubCategory = async (req, res) => {
    try {
    
        const newsubCategory = await subCategoryService.addsubCategory({ ...req.body, userId: req.user.userId });
        logger.info('subCategory added successfully');
        return newsubCategory;
        
    } catch (error) {
        logger.error(`Error adding subCategory: ${error.message}`);
        throw new Error('Error adding subCategory');
    }
};


exports.updatesubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const { subcategory , category} = req.body;
        const userId = req.user.userId;
        const updatedsubCategory = await subCategoryService.updatesubCategory(subCategoryId, subcategory,category, userId);
        logger.info(`subCategory with ID ${subCategoryId} updated successfully`);
        return updatedsubCategory;
    } catch (error) {
        logger.error(`Error updating subCategory: ${error.message}`);
        throw new Error('Error updating subCategory');
    }
};

exports.deletesubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const userId = req.user.userId;
        await subCategoryService.deletesubCategory(subCategoryId, userId);
        logger.info(`subCategory with ID ${subCategoryId} deleted successfully`);
    } catch (error) {
        logger.error(`Error deleting subCategory: ${error.message}`);
        throw new Error('Error deleting subCategory');
    }
};


