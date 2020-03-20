const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true
		},
		profile: {
			type: String,
			required: true
		},
		hashedPassword: {
			type: String,
			required: true
		},
		salt: String,
		about: {
			type: String
		},
		role: {
			type: Number,
			trim: true
		},
		photo: {
			data: Buffer,
			contentType: String
		},
		resetPasswordLink: {
			data: String,
			default: ''
		}
	},
	{ timestamp: true }
);

userSchema.pre('save', async function(next) {
	try {
		if (this.isModified('hashedPassword')) {
			this.salt = await bcrypt.genSalt(10);
			this.hashedPassword = await bcrypt.hash(this.hashedPassword, this.salt);
		}
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods = {
	// or use bcrypt.compare(plain, hashed)
	authenticate: async function(plainPassword) {
		return (
			this.hashedPassword === (await bcrypt.hash(plainPassword, this.salt))
		);
	}
};

module.exports = mongoose.model('User', userSchema);
