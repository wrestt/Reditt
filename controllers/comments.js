var db = require('../models/index');

// INDEX
app.get('/posts/:post_id/comments', function(req, res){
  db.Comment.find({}, function(err, comments){
    res.render('comments/index', {comments: comments});
  })
});

// NEW
app.get('/posts/:post_id/comments/new', function(req, res){
  res.render('comments/new');
});

// CREATE
app.post('/posts/:post_id/comments', function(req, res){
  var newComment = req.body;
  db.Comment.create(newComment, function(err, comment){
    if (err) {
      console.log(err);
    } else {
        res.render('comments/new', {comment: comment});
      }
  })
});

// SHOW
app.get('/posts/:post_id/comments/:id', function(req, res){
  db.Comment.findById(req.params.id)
  .populate('post')
  .exec(function(err, comment){
    if (err) {
      console.log(err);
    } else {
      res.render('comments/show');
    }
  })
});

// EDIT
app.get('/posts/:post_id/comments/:id/edit', function(req, res){
 db.Comment.findById(req.params.id, function(err, comment){
   res.render('comments/edit', {comment:comment})
 });
});

// UPDATE
app.put('/posts/:post_id/comments/:id', function(req, res){
  var updateContent = req.body;
  db.Comment.findByIdAndUpdate(req.params.id, updateContent,
    function(err, comment){
      if (err) {
        console.log(err)
      } else {
        console.log(commnet);
        res.redirect('/posts/:post_id/comments')
      }
    }
  )
});

// DESTROY
app.delete('posts/:post_id/comments/:id', function(req, res){
  db.Comment.findByIdAndRemove(req.params.id, function(err, comment){
    if (err) {
      console.log(err);
      res.redirect('posts/' + reg.params.post_id + '/comments');
    } else {
      console.log('deleted comment');
      res.redirect('posts/' + reg.params.post_id + '/comments');
    }
  })
});
