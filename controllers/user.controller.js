// controllers/user.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../logger/api.logger');
const userService = require('../services/user.service');

exports.getUser = async (req, res) => {
    try {
        const userDetails = await userService.getUserData(req);
        logger.info('User retrieved successfully');
        return userDetails;
    } catch (error) {
        logger.error(`Error fetching user: ${error.message}`);
        throw new Error('Error fetching user');
    }
};

exports.register = async (req) => {
    try {
        const userData = {...req.body};
        const user = await userService.registerUser(userData);
        return user;
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        throw new Error('Error registering user');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        logger.error(`Error logging in user: ${error.message}`);
        throw new Error('Error logging in user');
    }
};

exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        await userService.sendOTP(email);
        logger.info(`OTP sent successfully to ${email}`);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        logger.error(`Error while sending OTP: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }
    try {
        const otpVerificationStatus = await userService.verifyOTP(email, otp);
        logger.info(`OTP verified successfully for ${email}`);
        res.status(200).json({ success: true});
    } catch (error) {
        logger.error(`Error while verifying OTP: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.passwordReset = async (req,res) => {
 try {
    const {email,password}  = req.body;
    await userService.passwordReset(email,password);
    res.status(200).json({ success: true});

 } catch (error) {
    logger.error(`Error while verifying OTP: ${error.message}`);
    res.status(400).json({message: error.message });
 }
}