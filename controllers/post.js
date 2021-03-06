const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('./../mysql.js');

router.get('/new', (req, res, next) => {
	res.render('post/new', { 
		title: 'Create Post',
		header: 'New Post',
	});
});

router.post('/create', (req, res, next) => {
	const { title, user, content } = req.body;
	const slug = slugify(title);
	const values = [ title, slug, user, content ];

	mysql('INSERT INTO `Post` (`title`, `slug`, `author`, `content`) VALUES (?, ?, ?, ?)', values, (results, fields) => {
		res.redirect(`/post/${results.insertId}/${slug}`);
	}, (error) => {
		return next(error);
	});
});

router.get('/list', (req, res, next) => {
	mysql('SELECT * FROM `Post`', [], (results, fields) => {
		const posts = [];
		for(var i = 0; i < results.length; i++) {
			var href = `/post/${results[i].id}/${results[i].slug}`;

			posts.push({
				id: results[i].id,
				title: results[i].title,
				slug: results[i].slug,
				user: results[i].author,
				timestamp: results[i].timestamp,
				edit_timestamp: results[i].edit_timestamp,
				content: results[i].content,
				href: href,
			});
		}
		
		res.render('post/list', { 
			title: 'Posts',
			header: 'List Posts',
			posts: posts,
		});
	}, (error) => {
		return next(error);
	});
});

router.get('/:post_id/edit', (req, res, next) => {
	const post_id = req.params.post_id;

	mysql('SELECT * FROM `Post` WHERE `id` = ?', [ post_id ], (results, fields) => {
		res.render('post/edit', { 
			title: 'Editing: ' + results[0].title,
			header: 'Editing: ' + results[0].title,
			post_id: post_id,
			post_user: results[0].author,
			post_title: results[0].title,
			post_content: results[0].content
		});
	}, (error) => {
		return next(error);
	});
});

router.post('/:post_id/update', (req, res, next) => {
	const post_id = req.params.post_id;
	const { title, user, content } = req.body;
	const slug = slugify(title);
	const values = [ title, slug, user, content, post_id ];

	mysql('UPDATE `Post` SET `title` = ?, `slug` = ?, `author` = ?, `content` = ? WHERE `id` = ?', values, (results, fields) => {
		res.redirect(`/post/${post_id}/${slug}`);
	}, (error) => {
		return next(error);
	});
});

router.post('/:post_id/delete', (req, res, next) => {
	const post_id = req.params.post_id;

	mysql('DELETE FROM `Post` WHERE `id` = ?', [ post_id ], (results, fields) => {
		res.redirect(`/post/list`);
	}, (error) => {
		return next(error);
	});
});

router.get('/:post_id/:slug?', (req, res, next) => {
	const post_id = req.params.post_id;

	mysql('SELECT * FROM `Post` WHERE `id` = ?', [ post_id ], (results, fields) => {
		res.render('index', { 
			title: results[0].title,
			header: results[0].title, 
			content: results[0].content,
		});
	}, (error) => {
		return next(error);
	});
});


function slugify(title) {
	return title.replace(/ /g, '-').toLowerCase();
}

module.exports = router;
