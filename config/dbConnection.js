const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            serverSelectionTimeoutMS: 20000
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;