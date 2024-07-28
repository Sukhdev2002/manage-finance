// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const logger = require('../logger/api.logger');


router.get('/',authMiddleware, async (req, res) => {
    try {
        
        const userData = await userController.getUser(req, res);
        logger.info('User retrieved successfully');
        res.json(userData);
    } catch (error) {
        logger.error(`Error fetching user: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData  =  await userController.register(req);
        logger.info('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' })
        // res.status(201).json(userData);
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        await userController.login(req, res);
        logger.info('User logged in successfully');
    } catch (error) {
        logger.error(`Error logging in user: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/send-otp', async (req, res) => {
    try {
        await userController.sendOTP(req, res);
        logger.info('Otp Sent successfully');
    } catch (error) {
        logger.error(`Error while sending Otp: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        await userController.verifyOTP(req, res);
        logger.info('Otp verified successfully');
    } catch (error) {
        logger.error(`Error while otp verification: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/forgot-password', async (req,res) => {
    try {
        await userController.passwordReset(req,res);
        logger.info('Password reset successfully')
    } catch (error) {
        logger.error(`Error while reseting password: ${error.message}`);
        res.status(500).json({message: 'Server Error' });
    }
})



module.exports = router;
