const express = require('express');
const router = express.Router();
const {
	signup,
	signin,
	signout,
	requireSignIn
} = require('../../controllers/user');
const {
	userSignUpValidator,
	userSignInValidator
} = require('../../middlewares/validators/auth');
const { runValidation } = require('../../middlewares/validators/runValidation');
router.post('/signup', userSignUpValidator, runValidation, signup);
router.post('/signin', userSignInValidator, runValidation, signin);
router.post('/signout', signout);
router.get('/admin', requireSignIn, (req, res) => {
	res.json({ msg: 'You have access to this page!' });
});

module.exports = router;
