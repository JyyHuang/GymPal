const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
async function getWorkouts(req, res){
    // find all data
    const workouts = await Workout.find({}).sort({createdAt: -1});

    res.status(200).json(workouts);
}

// GET single workout by id
async function getSingleWorkout(req, res){
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Workout not found"});
    }

    const workout = await Workout.findById(id);

    if (!workout){
        return res.status(404).json({error: "Workout not found"});
    }

    res.status(200).json(workout);
}

// POST new workout
async function createWorkout(req, res){
    const { workoutName, sets, reps, weight } = req.body;

    // add to mongodb
    try {
        const workout = await Workout.create({workoutName, sets, reps, weight});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// DELETE workout by id
async function deleteWorkout(req, res){
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Workout not found"});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if (!workout){
        return res.status(404).json({error: "Workout not found"});
    }

    res.status(200).json(workout);
}

// PATCH (update) workout by id
async function editWorkout(req, res){
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Workout not found"});
    };

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!workout){
        return res.status(404).json({error: "Workout not found"});
    };

    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    editWorkout
}