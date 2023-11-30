const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authrozation;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //attach the user to the meals routes
        req.user = { userId: payload.userId, name: payload.name }

        //alternative code as an optional replacement of the previous line:
        //const user = User.findById(payload.id).select('-password');
        //req.user = user;
        next();
    } catch (error){
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = auth;