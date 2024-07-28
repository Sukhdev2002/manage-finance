// routes/subCategory.routes.js
const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategory.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const logger = require('../logger/api.logger');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const subCategories = await subCategoryController.getsubCategories(req, res);
        logger.info('subCategories retrieved successfully');
        res.json(subCategories);
    } catch (error) {
        logger.error(`Error fetching subCategories: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const subCategory = await subCategoryController.addsubCategory(req, res);
        logger.info('subCategory added successfully');
        res.status(201).json(subCategory);
    } catch (error) {
        logger.error(`Error adding subCategory: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:subCategoryId', async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const subCategory = await subCategoryController.updatesubCategory(req, res);
        logger.info(`subCategory with ID ${subCategoryId} updated successfully`);
        res.json(subCategory);
    } catch (error) {
        logger.error(`Error updating subCategory: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:subCategoryId', async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        await subCategoryController.deletesubCategory(req, res);
        logger.info(`subCategory with ID ${subCategoryId} deleted successfully`);
        res.json({ message: 'subCategory deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting subCategory: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
