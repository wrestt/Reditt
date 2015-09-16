var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  bday: Date,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
})


var User = mongoose.model('User', userSchema);

module.exports = User;
