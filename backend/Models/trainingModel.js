const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainingSchema = new Schema(
	{
		date: {
			type: Date,
			default: Date.now,
		},
		type: {
			type: String,
			trim: true,
			required: 'Enter the type of training',
		},
		exercises: [
			{
				type: {
					type: String,
					trim: true,
					required: 'Enter the type of exercise',
				},
				name: {
					type: String,
					trim: true,
					required: 'Enter the name of exercise',
				},
				weight: {
					type: String,
					required: true,
				},
				reps: {
					type: Number,
					required: true,
				},
				sets: {
					type: Number,
					required: true,
				},
				duration: {
					type: Number,
					required: 'Enter the duration of exercise in minutes',
				},
			},
		],
		totalDuration: {
			type: Number,
			required: true,
		},
	},
	{
		timeStamps: true,
	}
);

trainingSchema.pre('save', function (next) {
	if (this.type) {
		this.type = this.type.charAt(0).toUpperCase() + this.type.slice(1).toLowerCase();
	}
	if (this.name) {
		this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
	}
	next();
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
