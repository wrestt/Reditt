var db = require('../models/index');

// INDEX
app.get('/posts', function(req, res){
  db.Post.find({}, function(req, res){
    res.render('posts/index');
  });
});

// NEW
app.get('/posts/new', function(req, res){
  res.render('posts/new');
});


// CREATE
app.post('/posts', function(req, res){
  var newPost = req.body;
  db.Post.create(newPost, function(err, post){
    if(err){
      console.log(err);
      res.render('posts/new', {post: post});
    } else {
      res.redirect('/posts');
    }
  });
});

// SHOW
app.get('/posts/:id', function(req, res){
  db.Post.findById(req.params.id)
    .populate('user')
    .exec(function(err, post){
      if (err) {
        console.log(err);
      } else {
        console.log(post);
        res.render('posts/show', {post: post});
      }
    });
});

// EDIT
app.get('/posts/:id/edit', function(req, res){

});

// UPDATE
app.put('/posts/:id', function(req, res){

});

// DESTROY
app.delete('/posts/:id', function(req, res){

});
