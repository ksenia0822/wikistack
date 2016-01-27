var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());


router.get('/', function(request, response, next) {
	Page.find().exec().then(function(allPages){
  // response.json(foundPage);
  	console.log(allPages)
   response.render('index', {keyForAllPages: allPages});
  })
})


router.post('/', function(request, response, next) {
	var title = request.body.title;
	var content = request.body.content;
	var page = new Page({
    title: title,
    content: content
    });
	page.save()
	.then(function(page) {
		console.log("page: ", page, "page route: ", page.route)
		response.redirect(page.route);
	}).then(null, next);
})

router.get('/add', function(request, response, next) {
	 response.render('addpage');
})

// Dynamic wiki page route
router.get('/:urlTitle', function(request, response, next) {
  Page.findOne({ urlTitle: request.params.urlTitle }).exec().then(function(foundPage){
  // response.json(foundPage);
   response.render('wikipage', {title: foundPage.title, content: foundPage.content, author: foundPage.author});
  }) 
});


module.exports = router;











