var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  post: String,
  author: String,
  date: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
