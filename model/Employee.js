const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Employee', empSchema);