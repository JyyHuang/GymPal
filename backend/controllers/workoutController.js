const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
async function getWorkouts(req, res){
    const user_id = req.user._id
    // find all data
    const workouts = await Workout.find({user_id}).sort({updatedAt: -1});

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

    // Handle User Error Messages
    let missingFields = []

    if (!workoutName){
        missingFields.push('Workout Name')
    }
    if (!sets){
        missingFields.push('Sets')
    }
    if (!reps){
        missingFields.push('Reps')
    }
    if (!weight){
        missingFields.push('Weight')
    }
    if (missingFields.length > 0){
        return res.status(400).json({error:'Fill in all fields!', missingFields})
    }
    

    // add to mongodb
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({workoutName, sets, reps, weight, user_id});
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

    const { workoutName, sets, reps, weight } = req.body;

    const user_id = req.user._id
    // Handle User Error Messages
    const missingFields = []

    if (!workoutName){
        missingFields.push('Workout Name')
    }
    if (!sets){
        missingFields.push('Sets')
    }
    if (!reps){
        missingFields.push('Reps')
    }
    if (!weight){
        missingFields.push('Weight')
    }
    if (missingFields.length > 0){
        return res.status(400).json({error:'Fill in all fields!', missingFields})
    }

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Workout not found"});
    };

    try{
        const workout = await Workout.findOneAndUpdate({_id: id, user_id: user_id}, {
            ...req.body
        }, {new: true});
    
        if (!workout){
            return res.status(404).json({error: "Workout not found"});
        };
    
        res.status(200).json(workout);
    } catch (error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    editWorkout
}
