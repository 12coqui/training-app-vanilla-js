const Training = require('../Models/trainingModel');
const mongoose = require('mongoose');

async function getAllWorkouts(req, res) {
	try {
		const workouts = await Training.find();
		if (!workouts) {
			return res.status(404).json({ message: 'No workouts found' });
		}
		res.status(200).json(workouts);
	} catch (err) {
		res.json(err.message);
	}
}

async function getWorkout(req, res) {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'Invalid workout ID' });
		}
		const workout = await Training.findById(req.params.id);
		if (!workout) {
			return res.status(404).json({ message: 'Workout not found' });
		}
		res.status(200).json(workout);
	} catch (err) {
		res.json(err.message);
	}
}

async function createWorkout(req, res) {
	try {
		const newWorkout = await Training.create(req.body);
		res.status(200).json(newWorkout);
	} catch (err) {
		res.json(err.message);
	}
}

async function deleteWorkout(req, res) {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'Invalid workout ID' });
		}
		const workout = await Training.deleteOne({ _id: id });
		if (!workout) {
			return res.status(404).json({ message: 'Workout not found' });
		}
		res.status(200).json(workout);
	} catch (err) {
		res.json(err.message);
	}
}

async function updateWorkout(req, res) {
	try {
		const workoutId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(workoutId)) {
			return res.status(400).json({ message: 'Invalid workout ID' });
		}
		const updatedWorkout = req.body;

		const workout = await Training.findByIdAndUpdate(workoutId, updatedWorkout, { new: true });

		if (!workout) {
			return res.status(404).json({ message: 'Workout not found' });
		}

		res.json(workout);
	} catch (err) {
		res.status(500).json(err.message);
	}
}

const editWorkout = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;
	try {
		const updatedWorkout = await Training.findByIdAndUpdate(id, updates);
		if (!updatedWorkout) {
			return res.status(404).send({ error: 'Workout not found' });
		}
		res.status(200).send({ id: updatedWorkout._id });
	} catch (error) {
		res.status(500).send({ error });
	}
};

module.exports = {
	getAllWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
	editWorkout,
};
