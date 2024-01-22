require('dotenv').config();
const Nutrition = require('../models/nutritionModel');
const mongoose = require('mongoose');


// GET nutrition
async function getNutrition(req, res){
    const nutrition = await Nutrition.find({}).sort({createdAt: -1});
    
    res.status(200).json(nutrition);
}

// GET food search
async function getFoodQuery(req,res) {
    const param = req.query.query;

    if (!param){
        return res.status(400).json({error: 'Please input a search'})
    }

    const foods = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.FDC_API_KEY}&query=${param}&pageSize=10`,{
        method:'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const foodsJson = await foods.json();

    if(foodsJson.foods === undefined || foodsJson.foods.length === 0){
        return res.status(400).json({error:'No Results, Please Check Spelling'})
    }
    
    res.status(200).json(foodsJson.foods)
}

// POST new food
async function createFoodItem(req, res){
    const {foodName, calories, protein, fat} = req.body;

    try {
        const food = await Nutrition.create({foodName, calories, protein, fat});
        res.status(200).json(food);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// DELETE food item by id
async function deleteFoodItem(req, res){
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Food not found"});
    }

    const food = await Nutrition.findOneAndDelete({_id: id});

    if (!food){
        return res.status(404).json({error: "Food not found"});
    }

    res.status(200).json(food);
}

// DELETE all items
async function deleteAllFood(req,res){
    try {
        const food = await Nutrition.deleteMany({});
        res.status(200).json(food);
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getNutrition,
    createFoodItem,
    deleteFoodItem,
    deleteAllFood,
    getFoodQuery
}
