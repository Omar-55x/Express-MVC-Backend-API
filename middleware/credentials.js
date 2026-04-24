const allowedOrigins = require('../config/alllowedOrigins');

const credentials = (req, res, next) => {
    const origins = req.header.origin;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};

module.exports = credentials;