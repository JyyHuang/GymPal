const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Nutrition", nutritionSchema)
