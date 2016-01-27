var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!

mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
	name: String,
	email: String
})

// Model to use in a reference 
var User = mongoose.model('User',userSchema)

// Page Schema
var pageSchema = new Schema({
  title:  String,
  urlTitle: String,
  content: String,
  date: { type: Date, default: Date.now },
  status: Boolean, // true=open, false=closed
  author: [{
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  }]
});