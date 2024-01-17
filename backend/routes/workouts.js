const express = require('express');

const {
    getWorkouts, 
    getSingleWorkout, 
    createWorkout,
    deleteWorkout,
    editWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

// GET single workout by id
router.get('/:id', getSingleWorkout);

// POST (create) new workout
router.post('/', createWorkout);

// DELETE workout by id
router.delete('/:id', deleteWorkout);

// PATCH (update) workout by id
router.patch('/:id', editWorkout);

module.exports = router;