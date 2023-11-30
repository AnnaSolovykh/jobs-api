const Meal =  require('../models/Meal');
const { StatusCodes } = require('http-status-codes');
//const { BadRequestError, NotFoundError } = require('../errors');

const getAllMeals = async (req, res) => {
    res.send('register user')
};

const getMeal = async (req, res) => {
    res.send('login user')
};

const createMeal = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const meal = await Meal.create(req.body);
    res.status(StatusCodes.CREATED).json({ meal })
};

const updateMeal = async (req, res) => {
    res.send('update meal')
};

const deleteMeal = async (req, res) => {
    res.send('delete meal')
};


module.exports = {
    getAllMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
};