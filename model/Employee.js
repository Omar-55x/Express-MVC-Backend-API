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
    age: Number
});

module.exports = mongoose.model('Employee', empSchema);