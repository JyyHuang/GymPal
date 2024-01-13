const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    servingSize: {
        type: Number,
        required: true
    },
    numberOfServings: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
})
