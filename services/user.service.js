// services/user.service.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const logger = require('../logger/api.logger');
const utils = require('../utils/utils')
const OTP = require('../models/otp.model');
const OTP_EXPIRATION_TIME = 5 * 60 * 1000;

exports.registerUser = async (userData) => {
    try {
        const password = userData?.password;
        userData.gender = JSON.parse(userData.gender);
        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;
        const user = new User(userData);
        const newUser = await user.save();
        logger.info('User Saved successfully');
        return newUser;
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        throw new Error('Error registering user');
    }
};

exports.getUserData = async (req) => {
    try {
        let _id = req.user.userId;
        // let query = utils.buildQuery(userId, req.query);
        const user = await User.findOne({_id});
        return user;
    } catch (error) {
        logger.error(`Error finding user: ${error.message}`);
        throw new Error('Error finding user');
    }
};


 // 5 minutes

 exports.sendOTP = async (email) => {
    const otp = utils.generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

    // Save OTP to the database
    await OTP.findOneAndUpdate(
        { email },
        { otp, expiresAt },
        { upsert: true, new: true }
    );

    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}`;

    try {
        await utils.sendEmail(email, subject, text);
    } catch (error) {
        throw new Error('Failed to send OTP');
    }
};

exports.verifyOTP = async (email, otp) => {
    const otpData = await OTP.findOne({ email });

    if (!otpData) {
        throw new Error('OTP Is Not Generated');
    }

    if (Date.now() > otpData.expiresAt) {
        throw new Error('OTP expired');
    }

    if (otp !== otpData.otp) {
        throw new Error('Invalid OTP');
    }

    await OTP.deleteOne({ email });

    return { success: true };
};


exports.passwordReset = async (email, password) => {
    try {
        const userData = await User.findOne({email});
        if(!userData){
            throw new Error('User Is Not Registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        await User.findOneAndUpdate({email},{password},{ upsert: true, new: true });
    } catch (error) {
        throw new Error('Error updating password: ' + error.message);
    }

}
