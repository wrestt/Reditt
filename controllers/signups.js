var db = require('../models/index');

app.get('/signup', routeMiddleware.preventLoginSignup, function(rew, res){
  res.render('users/signup');
});

app.post('/signup', function(req, res){
  var newUser = req.body;
  db.User.create(newUser, function(err, user){
    if (user) {
      req.login(user);
      res.redirect('/users');
    } else {
      res.render('users/signup');
    }
  });
});
