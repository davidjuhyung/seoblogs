const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// define routes
const blogRoutes = require('./routes/api/blog');
const userRoutes = require('./routes/api/user');

// db connection
const connectDB = require('./models/db_config');
connectDB();

// spin up the sever called app!
const app = express();

// apply middlewares for 'app'
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
	app.use(cors());
}

// routes
app.use('/api', blogRoutes);
app.use('/api/user', userRoutes);

// listen
// explanation on process.env:
// https://appdividend.com/2019/06/06/what-is-process-env-in-node-js-environment-variables-in-node-js/
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
