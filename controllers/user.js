const express = require('express');
const router = express.Router();
const mysql = require('./../mysql.js');

router.get('/new', (req, res, next) => {

});

router.post('/create', (req, res, next) => {

});

router.get('/list', (req, res, next) => {
	mysql('SELECT * FROM `User`', (results, fields) => {
		console.log(results);
		res.send('Homepage');
	}, (error) => {
		return next(error);
	});
});

router.get('/:user_id', (req, res, next) => {
	const user_id = req.params.user_id;

	mysql('SELECT * FROM `User` WHERE `id` = ' + user_id, (results, fields) => {
		res.render('index', { 
			title: results[0].title,
			header: results[0].title, 
			content: results[0].content
		});
	}, (error) => {
		return next(error);
	});
});	

router.get('/:user_id/edit', (req, res, next) => {

});

router.post('/:user_id/update', (req, res, next) => {

});

router.post('/:user_id/delete', (req, res, next) => {

});

module.exports = router;
