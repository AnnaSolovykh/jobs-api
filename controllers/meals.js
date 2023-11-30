const Meal =  require('../models/Meal');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllMeals = async (req, res) => {
    const meals = await Meal.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ meals, count: meals.length  })
};

const getMeal = async (req, res) => {
    const { 
        user: { userId }, 
        params:{ id: mealId } 
    } = req;

    const meal = await Meal.findOne({
        _id: mealId, 
        createdBy: userId
    });
    if (!meal) {
        throw new NotFoundError(`No meal was found with id ${mealId}`);
    }

    res.status(StatusCodes.OK).json({ meal });
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