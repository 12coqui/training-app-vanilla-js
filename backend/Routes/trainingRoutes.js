const express = require('express');
const router = express.Router();
const {
	getAllWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
	editWorkout,
} = require('../Controllers/trainingController');

// Get all workouts
router.get('/', getAllWorkouts);

// Get a specific workout
router.get('/:id', getWorkout);

// Create a new workout
router.post('/', createWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

// Replace a workout
router.put('/:id', updateWorkout);

// Edit a workout
router.patch('/:id', editWorkout);

module.exports = router;
