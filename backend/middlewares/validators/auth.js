const { check } = require('express-validator');

exports.userSignUpValidator = [
	check('name', 'Name is required')
		.not()
		.isEmpty(),
	check('email', 'Must be a valid email address').isEmail(),
	check('password', 'Must be at least 6 characters long').isLength({ min: 6 })
];

exports.userSignInValidator = [
	check('email', 'Must be a valid email address').isEmail(),
	check('password', 'Must be at least 6 characters long').isLength({ min: 6 })
];
