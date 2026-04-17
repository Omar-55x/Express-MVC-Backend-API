const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired: true
    },
    displayname: String,
    age: {
        type: Number,
        reqired: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);