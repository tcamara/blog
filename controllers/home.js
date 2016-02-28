const express = require('express');
const router = express.Router();
const mysql = require('./../mysql.js');

router.get('/', (req, res, next) => {
	res.send('Homepage');
});

router.get('/about', (req, res, next) => {
	res.render('about', { 
		title: 'About This Blog'
	});
});

module.exports = router;
