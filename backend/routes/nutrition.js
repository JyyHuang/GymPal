const express = require('express');

const {
    getNutrition,
    createFoodItem,
    deleteFoodItem,
    deleteAllFood,
    getFoodQuery
} = require('../controllers/nutritionController');

const router = express.Router();

// GET all workouts
router.get('/', getNutrition);

router.get('/search', getFoodQuery);

// POST (create) new food item
router.post('/', createFoodItem);

// DELETE food item by id
router.delete('/:id', deleteFoodItem);

// DELETE all food items
router.delete('/', deleteAllFood);

module.exports = router;