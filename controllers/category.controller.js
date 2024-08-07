// controllers/category.controller.js
const categoryService = require('../services/category.service');
const logger = require("../logger/api.logger");



exports.getCategories = async (req, res) => {
    try {
        
        const categories = await categoryService.getCategoriesByUser(req);
        return categories;
    } catch (error) {
        logger.error(`Error fetching categories: ${error.message}`);
        throw new Error('Error fetching categories');
    }
};



exports.addCategory = async (req, res) => {
    try {
    
        const newCategory = await categoryService.addCategory({ ...req.body, userId: req.user.userId });
        logger.info('Category added successfully');
        return newCategory;
        
    } catch (error) {
        logger.error(`Error adding category: ${error.message}`);
        throw new Error('Error adding category');
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { category } = req.body;
        const userId = req.user.userId;
        const updatedCategory = await categoryService.updateCategory(categoryId, category, userId);
        logger.info(`Category with ID ${categoryId} updated successfully`);
        return updatedCategory;
    } catch (error) {
        logger.error(`Error updating category: ${error.message}`);
        throw new Error('Error updating category');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const userId = req.user.userId;
        await categoryService.deleteCategory(categoryId, userId);
        logger.info(`Category with ID ${categoryId} deleted successfully`);
    } catch (error) {
        logger.error(`Error deleting category: ${error.message}`);
        throw new Error('Error deleting category');
    }
};


