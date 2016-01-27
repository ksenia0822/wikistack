var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!

mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
})

// Page Schema
var pageSchema = new Schema({
  title:  {type: String, required: true},
  urlTitle: {type: String, required: true},
  content: {type: String, required: true},
  status: {type: String, enum: ['open', 'closed']},
  date: { type: Date, default: Date.now },
  author: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  }
});

// ???
pageSchema.virtual('route').get(function () {
  return '/wiki/' + this.urlTitle;
});

pageSchema.pre('validate', function(next) {
  this.urlTitle = generateUrlTitle(this.title);
  next();
});

function generateUrlTitle (title) {
  if (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}

// ??? What is the purpose of these two lines? 
var Page = mongoose.model('Page',pageSchema)
var User = mongoose.model('User',userSchema)



module.exports = {
  Page: Page,
  User: User
};