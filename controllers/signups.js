var db = require('../models/index');

app.get('/signup', routeMiddleware.preventLoginSignup, function(rew, res){
  res.render('users/signup');
});

app.post('/signup', function(req, res){
  var newUser = req.body.user;
  console.log(newUser);
  db.User.create(newUser, function(err, user){
    if (user) {
      req.login(user);
      res.render('users/show', {user: user});
    } else {
      console.log(err);
      res.render('users/signup');
    }
  });
});
