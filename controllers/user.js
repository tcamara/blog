const express = require('express');
const router = express.Router();
const mysql = require('./../mysql.js');

router.get('/new', (req, res, next) => {
	res.render('user/new', { 
		title: 'Create User',
		header: 'New User',
	});
});

router.post('/create', (req, res, next) => {
	const { name, email, password, bio } = req.body;
	const slug = slugify(name);
	const values = [ name, slug, email, password, bio ];

	mysql('INSERT INTO `User` (`name`, `slug`, `email`, `password`, `bio`) VALUES (?, ?, ?, ?, ?)', values, (results, fields) => {
		res.redirect(`/user/${results.insertId}/${slug}`);
	}, (error) => {
		return next(error);
	});
});

router.get('/list', (req, res, next) => {
	mysql('SELECT * FROM `User`', [], (results, fields) => {
		const users = [];
		for(var i = 0; i < results.length; i++) {
			var href = `/user/${results[i].id}/${results[i].slug}`;

			users.push({
				id: results[i].id,
				name: results[i].name,
				slug: results[i].slug,
				email: results[i].email,
				num_posts: results[i].num_posts,
				bio: results[i].bio,
				href: href,
			});
		}
		
		res.render('user/list', { 
			title: 'Users',
			header: 'List Users',
			users: users,
		});
	}, (error) => {
		return next(error);
	});
});

router.get('/:user_id/edit', (req, res, next) => {
	const user_id = req.params.user_id;

	mysql('SELECT * FROM `User` WHERE `id` = ?', [ user_id ], (results, fields) => {
		res.render('user/edit', { 
			title: 'Editing: ' + results[0].title,
			header: 'Editing: ' + results[0].title,
			post_id: user_id,
			post_user: results[0].author,
			post_title: results[0].title,
			post_content: results[0].content
		});
	}, (error) => {
		return next(error);
	});
});

router.post('/:user_id/update', (req, res, next) => {
	const user_id = req.params.user_id;
	const { name, email, password, bio } = req.body;
	const slug = slugify(name);
	const values = [ name, slug, email, password, bio, user_id ];

	mysql('UPDATE `User` SET `name` = ?, `slug` = ?, `email` = ?, `password` = ?, `bio` = ? WHERE `id` = ?', values, (results, fields) => {
		res.redirect(`/user/${user_id}/${slug}`);
	}, (error) => {
		return next(error);
	});
});

router.post('/:user_id/delete', (req, res, next) => {
	const user_id = req.params.user_id;

	mysql('DELETE FROM `User` WHERE `id` = ?', [ user_id ], (results, fields) => {
		res.redirect(`/user/list`);
	}, (error) => {
		return next(error);
	});
});

router.get('/:user_id/:slug?', (req, res, next) => {
	const user_id = req.params.user_id;

	mysql('SELECT * FROM `User` WHERE `id` = ?', [ user_id ], (results, fields) => {
		res.render('index', { 
			title: results[0].name,
			header: results[0].name, 
			content: results[0].bio,
		});
	}, (error) => {
		return next(error);
	});
});

function slugify(title) {
	return title.replace(/ /g, '-').toLowerCase();
}

module.exports = router;
