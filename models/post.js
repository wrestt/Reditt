var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: Date,
  image: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
