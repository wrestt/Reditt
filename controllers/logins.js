var db = require('../models/index');

app.get('/login', routeMiddleware.preventLoginSignup, function(req, res){
  res.render('users/login');
});

app.post('/login', function(req, res){
  db.User.authenticate(req.body.user,
  function(err, user){
    if (!err && user !== null) {
      req.login(user);
      res.redirect('/users');
    } else {
      console.log('error:', err);
      res.render('users/login', {user: user});
    }
  });
});
