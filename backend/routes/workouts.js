const express = require('express');

const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'GET workouts'})
})

// GET single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'GET single workout'})
})

// POST new workout
router.post('/', (req, res) => {
    res.json({msg: "POST new workout"})
})

// DELETE workout
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE workout"})
})

// UPDATE workout
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE workout"})
})

module.exports = router;