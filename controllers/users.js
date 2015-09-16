var db = require('../models/index');

// INDEX
app.get('/user', function(req, res){
  db.User.find({}, function(err, users){
    res.render('users/index', {users: users});
  });
});

// NEW
app.get('/user/new', function(req, res){
  res.render('users/new');
});


// CREATE
app.post('/users', function(req,res){
  var newUser = req.body.user;
  db.User.create(newUser,
  function(err, newUser){
    if (err){
      console.log(err);
    } else {
      console.log(newUser);
      res.redirect('/users');
    }
  });
});

// SHOW
app.get('/user/:id', function(req, res){

});

// EDIT
app.get('/user/:id/edit', function(req, res){

});

// UPDATE
app.put('/user/:id', function(req, res){

});

// DESTROY
app.delete('/user/:id', function(req, res){

});
