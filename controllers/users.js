var db = require('../models/index');

// INDEX
app.get('/users', function(req, res){
  db.User.find({}, function(err, users){
    res.render('users/index', {users: users});
  });
});

// NEW
app.get('/users/new', function(req, res){
  res.render('users/new');
});


// CREATE
app.post('/users', function(req,res){
  var newUser = req.body;
  db.User.create(newUser,
  function(err, newUser){
    if (err){
      console.log(err);
      res.render('users/new');
    } else {
      console.log(newUser);
      res.redirect('/users');
    }
  });
});


// SHOW
app.get('/users/:id', function(req, res){
  db.User.findById(req.params.id)
    .populate('post')
    .exec(function(err, user){
      res.render('users/show', {user: user});
    });
});

// EDIT
app.get('/users/:id/edit', function(req, res){
  db.User.findById(req.params.id, function(err, user){
    res.render('user/edit', {user: user});
  });
});

// UPDATE
app.put('/users/:id', function(req, res){
  var updateInfo = req.body;
  db.User.findByIdAndUpdate(req.params.id, updateInfo,
    function(err, user){
      if (err) {
        res.render('users/edit', {user: user});
      } else {
        res.redirect('/users');
      }
    });
});

// DESTROY
app.delete('/users/:id', function(req, res){
  db.User.findByIdAndRemove(req.params.id, function(err, user){
    if (err) {
      res.render('users/show');
    } else {
      res.redirect('/users');
    }
  });
});
