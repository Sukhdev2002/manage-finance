// controllers/user.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const logger = require('../logger/api.logger');


exports.getUser = async (req, res) => {
    try {
        const expenses = await expenseService.getUserData(req);
        logger.info('User retrieved successfully');
        return expenses;
    } catch (error) {
        logger.error(`Error fetching user: ${error.message}`);
        throw new Error('Error fetching user');
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        throw new Error('Error registering user');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
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
