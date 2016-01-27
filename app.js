var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var swig = require('swig');

// var routes = require('./index.js');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/staticviews'));

//Swig configuration
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.get('/', function(request, response, next) {
	response.send("Hello!")

})


app.listen(3000, function() {
	console.log("Server running on port 3000");
})