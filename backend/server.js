require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const trainingRoutes = require('./Routes/trainingRoutes');
const userRoutes = require('./Routes/userRoutes');
const cors = require('cors');

const app = express();
const corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/workout', trainingRoutes);
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
		console.log('Connected to MongoDB');
	})
	.catch(err => {
		console.log('ERROR', err);
	});
