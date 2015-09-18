var db = require('../models/index');

// INDEX
app.get('/posts/:post_id/comments', function(req, res){
  db.Post.findById(req.params.post_id)
    .populate('comments')
    .exec(function(err, post){
      if (err) {
        console.log(err);
      } else {
        db.Comment.populate(post, {
          path: 'comments.owner',
          model: 'User'
        },
        function(err, comments) {
          res.render('comments/index', {comments: comments, post:post});
        });
      }
    });
});

// NEW
app.get('/posts/:post_id/comments/new', routeMiddleware.ensureLoggedIn,function(req, res){
  db.Post.findById(req.params.post_id, function(err, post){
    if (err) {
      console.log(err);
    } else {
      db.User.findById(req.session.id, function(err, user){
         res.render('comments/new', {user: user, post: post});
       });
    }
  });
});

// CREATE
app.post('/posts/:post_id/comments', function(req, res){
  db.User.findById(req.session.id, function(err, owner){
    if (err) {
      console.log(err);
    } else {
      db.Post.findById(req.params.post_id, function(err, post){
        if (err) {
          console.log(err);
        } else {
           req.body.owner = owner;
          db.Comment.create(req.body, function(err, comment){
            console.log("err", err);
            console.log('commment', comment);
            post.comments.push(comment);
            owner.comments.push(comment);
            comment.owner = owner._id;
            comment.post = post._id;
            comment.save();
            post.save();
            owner.save();
            res.redirect('/posts/' + post._id + '/comments');
          });
        }
      });
    }
  });
});

// SHOW
// app.get('/posts/:post_id/comments/:id', function(req, res){
//   db.Comment.findById(req.params.id)
//   .populate('post')
//   .exec(function(err, comment){
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('comments/show');
//     }
//   });
// });

// EDIT
app.get('/posts/:post_id/comments/:id/edit', routeMiddleware.ensureCorrectUser,function(req, res){
 db.Comment.findById(req.params.id, function(err, comment){
   res.render('comments/edit', {comment:comment});
 });
});

// UPDATE
app.put('/posts/:post_id/comments/:id', function(req, res){
  var updateContent = req.body;
  db.Comment.findByIdAndUpdate(req.params.id, updateContent,
    function(err, comment){
      if (err) {
        console.log(err);
      } else {
        console.log(commnet);
        res.redirect('/posts/' + req.params.post_id  + '/comments');
      }
    });
});

// DESTROY
app.delete('posts/:post_id/comments/:id', routeMiddleware.ensureCorrectUser,function(req, res){
  db.Comment.findByIdAndRemove(req.params.id, function(err, comment){
    if (err) {
      console.log(err);
      res.redirect('posts/' + reg.params.post_id + '/comments');
    } else {
      console.log('deleted comment');
      res.redirect('posts/' + reg.params.post_id + '/comments');
    }
  });
});
