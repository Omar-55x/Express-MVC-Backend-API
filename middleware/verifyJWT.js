const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authroization || req.headers.Authorization;
    if (!authHeader?.satrtsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];        // Bearer + ' ' + token

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);        // Forbidden - inavlid token
            req.user = decoded.userInfo.username;
            req.role = decoded.userInfo.roles;
            next();
        }
    );
};

module.exports = verifyJWT;