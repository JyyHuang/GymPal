require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');
const nutritionRoutes = require('./routes/nutrition');


// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// workout routes
app.use('/api/GymPal/workouts/', workoutRoutes);
// calorie routes
app.use('/api/GymPal/nutrition/', nutritionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {console.log(`Connected to database. Listening on port ${process.env.PORT}`)});
    })
    .catch((error) => {console.log(error)});