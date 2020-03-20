const User = require('../models/User');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

exports.signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const username = shortId.generate();

		const newUserFields = {
			name,
			email,
			username,
			hashedPassword: password,
			profile: `${process.env.CLIENT_URL}/profile/${username}`
		};

		user = new User(newUserFields);

		await user.save();
		res.json({ message: 'Sign up Success! Please sign in' });
	} catch (err) {
		res.status(500).send('Server Error');
	}
};

exports.signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				error: 'User with that email does not exist! Please sign up'
			});
		}

		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: 'Wrong password'
			});
		}

		// generate token and pass it to client by saving in cookie

		const { _id, username, role } = user;
		const token = jwt.sign({ id: _id }, process.env.JWT_PRIVATE_KEY, {
			expiresIn: '1d'
		});
		console.log(token);

		res.cookie('token', token, { expiresIn: '1d' });
		res.json({ token, user: { _id, username, email, role } });
		// res.json({ message: 'Sign in Success! Please sign in' });
	} catch (err) {
		res.status(400).send('Invalid Credentials');
	}
};

exports.signout = (req, res) => {
	res.clearCookie('token');
	res.json({ msg: 'Sign out success' });
};

exports.requireSignIn = expressJWT({
	secret: process.env.JWT_PRIVATE_KEY
});
