var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/reddit_app');


module.exports.Comment = require('./comment');
module.exports.Post = require('./post');
module.exports.User = require('./user');
