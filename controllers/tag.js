const express = require('express');
const router = express.Router();
const mysql = require('./../mysql.js');

router.get('/new', (req, res, next) => {

});

router.post('/create', (req, res, next) => {

});

router.get('/list', (req, res, next) => {
	mysql('SELECT * FROM `Tag`', (results, fields) => {
		console.log(results);
		res.send('Homepage');
	}, (error) => {
		return next(error);
	});
});

router.get('/:tag_id', (req, res, next) => {
	const tag_id = req.params.tag_id;

	mysql('SELECT * FROM `Tag` WHERE `id` = ' + tag_id, (results, fields) => {
		res.render('index', { 
			title: results[0].title,
			header: results[0].title, 
			content: results[0].content
		});
	}, (error) => {
		return next(error);
	});
});	

router.get('/:tag_id/edit', (req, res, next) => {

});

router.post('/:tag_id/update', (req, res, next) => {

});

router.post('/:tag_id/delete', (req, res, next) => {

});

module.exports = router;
