
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const buildQuery = (userId, queryParams) => {
    const { month, moduleCode, category, subcategory } = queryParams;
    const query = { userId };
     // YYYY-MM format
    let startOfMonth, endOfMonth;
    if (month) {
        const isMonthOnly = month?.length === 7;
        if (isMonthOnly) {
            startOfMonth = new Date(`${month}-01`);
            endOfMonth = new Date(new Date(`${month}-01`).setMonth(startOfMonth.getMonth() + 1) - 1);
        } else {
            startOfMonth = new Date(month);
            endOfMonth = new Date(month);
            endOfMonth.setHours(23, 59, 59, 999);
        }
        query.date = { $gte: startOfMonth, $lte: endOfMonth };
    } 

   

    if (moduleCode) {
        query.moduleCode = moduleCode;
    }
    if (category) {
        query.category = category;
    }
    if (subcategory) {
        query.subcategory = subcategory;
    }

    return query;
};



const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'expensebuddy9@gmail.com',
            pass: "uogcbatookkiyryk"
        }
    });

    const mailOptions = {
        from: 'expensebuddy9@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    generateOTP,
    sendEmail,
    buildQuery
};

