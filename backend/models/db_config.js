const db = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
	try {
		await db.connect(DB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});
		console.log('DB is connected...');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
