const User = require('../Models/userModel');

//login user
async function login(req, res) {
	try {
		const { email, password } = req.body;
		const token = await User.login(email, password);
		res.status(200).json({ message: 'Login successful', token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}
//signup user
async function signup(req, res) {
	try {
		const { email, password } = req.body;
		const { token } = await User.signup(email, password);
		res.status(200).json({ message: 'Register successful', email, token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

module.exports = {
	login,
	signup,
};
