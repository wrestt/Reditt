var db = require('../models/index');

// INDEX
app.get('/posts', function(req, res){
  db.Post.find({}, function(err, posts){
    res.render('posts/index', {posts: posts});
  });
});

// NEW
app.get('/posts/new', routeMiddleware.ensureLoggedIn,function(req, res){
  res.render('posts/new');
});


// CREATE
app.post('/posts', function(req, res){
  var newPost = req.body;
  db.User.findById(req.session.id, function(err, user){
    if (!newPost.image) {
      newPost.image = 'default.gif';
    }
    db.Post.create(newPost, function(err, post){
      user.posts.push(post);
      post.owner = user._id;
      user.save();
      post.save();
      res.redirect('/posts');
    });
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
  db.Post.findById(req.params.id, function(err, post){
    res.render('posts/edit', {post:post});
  });
});

// UPDATE
app.put('/posts/:id', function(req, res){
  var updateContent = req.body;
  db.Post.findByIdAndUpdate(req.params.id, updateContent,
    function(err, post){
      if (err) {
        console.log(err);
        res.render('posts/edit', {post:post});
      } else {
        console.log(post);
        res.redirect('/posts/' + post._id )
      }
    }
  )
});

// DESTROY
app.delete('/posts/:id', function(req, res){
  db.Post.findByIdAndRemove(req.params.id, function(err, post){
    if (err) {
      console.log(err);
      res.render('posts/show');
    } else {
      res.redirect('/posts');
    }
  })
});
