var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  comment: String,
  author: String,
  date: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
