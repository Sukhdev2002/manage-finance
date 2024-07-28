// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: {
        name: { type: String, required: true },
        id: { type: String, required: true }
      },
});

module.exports = mongoose.model('User', userSchema);
