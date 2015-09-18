var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  content: String,
  date: Date,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
