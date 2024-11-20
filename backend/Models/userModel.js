const moongoose = require('mongoose');
const Schema = moongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendSignupEmail } = require('../services/emailService'); // Adjust the path as needed

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
});

userSchema.statics.signup = async function (email, password) {
	if (!email || !password) {
		throw new Error('Email and password are required');
	}
	const existingUser = await this.findOne({ email });
	if (existingUser) {
		throw new Error('User already exists');
	}
	const hashedPassword = await bcrypt.hash(password, 12);
	const user = await this.create({ email, password: hashedPassword });
	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '3d' });

	if (!existingUser && token) {
		// Send signup email
		await sendSignupEmail(email, 'Welcome to Our Service', 'Thank you for signing up!');
	}

	return { user, token };
};

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (!user) {
		throw new Error('Invalid email or password');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Invalid email or password');
	}
	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '3d' });

	return token;
};

module.exports = moongoose.model('User', userSchema);
