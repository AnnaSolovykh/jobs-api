const Meal =  require('../models/Meal');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllMeals = async (req, res) => {
    console.log(req.user)
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
    const { 
        body: { title, type, isFavorite },
        user: { userId }, 
        params:{ id: mealId } 
    } = req;

    if (title === '' || type === '') {
        throw new BadRequestError('Title or type cannot be empty')
    }   
    const meal = await Meal.findByIdAndUpdate(
        {
        _id: mealId, 
        createdBy: userId
        }, 
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!meal) {
        throw new NotFoundError(`No meal was found with id ${mealId}`);
    }

    res.status(StatusCodes.OK).json({ meal });
};

const deleteMeal = async (req, res) => {
    const { 
        user: { userId }, 
        params:{ id: mealId } 
    } = req;

    const meal = await Meal.findByIdAndRemove({
        _id: mealId, 
        createdBy: userId
    });

    if (!meal) {
        throw new NotFoundError(`No meal was found with id ${mealId}`);
    }

    res.status(StatusCodes.OK).send();
};

module.exports = {
    getAllMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
};