const express = require('express');
const router = express.Router();
const mysql = require('./../mysql.js');

router.get('/new', (req, res, next) => {
	res.render('tag/new', { 
		title: 'Create Tag',
		header: 'New Tag',
	});
});

router.post('/create', (req, res, next) => {
	const name = req.body.name;
	const slug = slugify(name);
	const values = [ name, slug ];

	mysql('INSERT INTO `Tag` (`name`, `slug`) VALUES (?, ?)', values, (results, fields) => {
		res.redirect(`/tag/${results.insertId}/${slug}`);
	}, (error) => {
		return next(error);
	});
});

router.get('/list', (req, res, next) => {
	mysql('SELECT * FROM `Tag`', [], (results, fields) => {
		const tags = [];
		for(var i = 0; i < results.length; i++) {
			var href = `/tag/${results[i].id}/${results[i].slug}`;

			tags.push({
				id: results[i].id,
				name: results[i].name,
				slug: results[i].slug,
				num_posts: results[i].num_posts,
				href: href,
			});
		}
		
		res.render('tag/list', { 
			title: 'Tags',
			header: 'List Tags',
			tags: tags,
		});
	}, (error) => {
		return next(error);
	});
});

router.get('/:tag_id/edit', (req, res, next) => {
	const tag_id = req.params.tag_id;

	mysql('SELECT * FROM `Tag` WHERE `id` = ?', [ tag_id ], (results, fields) => {
		res.render('tag/edit', { 
			title: 'Editing: ' + results[0].title,
			header: 'Editing: ' + results[0].title,
			post_id: tag_id,
			post_tag: results[0].author,
			post_title: results[0].title,
			post_content: results[0].content
		});
	}, (error) => {
		return next(error);
	});
});

router.post('/:tag_id/update', (req, res, next) => {
	const tag_id = req.params.tag_id;
	const name = req.body.name;
	const slug = slugify(name);
	const values = [ name, slug, tag_id ];

	mysql('UPDATE `Tag` SET `name` = ?, `slug` = ? WHERE `id` = ?', values, (results, fields) => {
		res.redirect(`/tag/${tag_id}/${slug}`);
	}, (error) => {
		return next(error);
	});
});

router.post('/:tag_id/delete', (req, res, next) => {
	const tag_id = req.params.tag_id;

	mysql('DELETE FROM `Tag` WHERE `id` = ?', [ tag_id ], (results, fields) => {
		res.redirect(`/tag/list`);
	}, (error) => {
		return next(error);
	});
});

router.get('/:tag_id/:slug?', (req, res, next) => {
	const tag_id = req.params.tag_id;

	mysql('SELECT * FROM `Tag` WHERE `id` = ?', [ tag_id ], (results, fields) => {
		res.render('index', { 
			title: results[0].name,
			header: results[0].name, 
			content: results[0].slug,
		});
	}, (error) => {
		return next(error);
	});
});

function slugify(title) {
	return title.replace(/ /g, '-').toLowerCase();
}

module.exports = router;
