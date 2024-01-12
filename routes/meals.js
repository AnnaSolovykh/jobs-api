const express = require('express');
const router = express.Router();

const {
    getAllMeals,
    getMeal,
    createMeal,
    updateMeal,
    deleteMeal
} = require('../controllers/meals');

router.route('/').post(createMeal).get(getAllMeals);
router.route('/:id').get(getMeal).delete(deleteMeal).patch(updateMeal);

module.exports = router;
