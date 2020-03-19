const express = require('express');
const router = express.Router();
const { sayHello } = require('../../controllers/blog');

router.get('/', sayHello);

module.exports = router;
