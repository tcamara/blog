Routes:

/ (pagination)
/about

/login
/login/post
/logout
/register
/register/post

/post/new
/post/create
/post/list (pagination)
/post/:id/:seo_phrase
/post/:id/edit
/post/:id/update
/post/:id/delete

/user/new
/user/create
/user/list (pagination)
/user/:id/:seo_phrase
/user/:id/edit
/user/:id/update
/user/:id/delete

/tag/new
/tag/create
/tag/list (pagination)
/tag/:id/:seo_phrase
/tag/:id/edit
/tag/:id/update
/tag/:id/delete


Database Structure:

// DROP TABLE IF EXISTS `Post`;
// CREATE TABLE `Post` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `title` varchar(100) NOT NULL,
//   `slug` varchar(100) NOT NULL,
//   `author` int(11) NOT NULL,
//   `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `edit_timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
//   `content` mediumtext NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

// INSERT INTO `Post` (`id`, `title`, `slug`, `author`, `timestamp`, `edit_timestamp`, `content`) VALUES
// (1,	'Test Post',	'test-post',	1,	'2016-01-12 14:22:41',	'0000-00-00 00:00:00',	'Test post contents');

// DROP TABLE IF EXISTS `Post_Tag`;
// CREATE TABLE `Post_Tag` (
//   `post_id` int(11) NOT NULL,
//   `tag_id` int(11) NOT NULL,
//   PRIMARY KEY (`post_id`,`tag_id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

// INSERT INTO `Post_Tag` (`post_id`, `tag_id`) VALUES
// (1,	1);

// DROP TABLE IF EXISTS `Tag`;
// CREATE TABLE `Tag` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(50) NOT NULL,
//   `slug` varchar(50) NOT NULL,
//   `num_posts` int(11) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;


// DROP TABLE IF EXISTS `User`;
// CREATE TABLE `User` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `name` varchar(100) NOT NULL,
//   `slug` varchar(100) NOT NULL,
//   `email` varchar(100) NOT NULL,
//   `num_posts` int(11) NOT NULL,
//   `password` varchar(100) NOT NULL,
//   `bio` text NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

// INSERT INTO `User` (`id`, `name`, `slug`, `email`, `num_posts`, `password`, `bio`) VALUES
// (1,	'Tim Camara',	'',	'tcamara21@gmail.com',	1,	'test',	'This is a bio about me.');