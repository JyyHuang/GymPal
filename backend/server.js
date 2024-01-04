require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workouts');
const calorieRoutes = require('./routes/calories');
const musicRoutes = require('./routes/music');


// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// workout routes
app.use('api/GymPal/workouts/', workoutRoutes);
// calorie routes
app.use('api/GymPal/calories/', calorieRoutes);
// music routes
app.use('api/GymPal/music/', musicRoutes);

app.listen(process.env.PORT, () => {console.log(`Listening on port ${process.env.PORT}`)});