var db = require('../models/index');

app.get('/login', routeMiddleware.preventLoginSignup, function(req, res){
  res.render('users/login');
});

app.post('/login', function(req, res){
  console.log(req.body.user);
  db.User.authenticate(req.body.user,
  function(err, user){
    console.log(user);
    if (!err && user !== null) {
      console.log("login", req.login(user));
      req.login(user);
      res.redirect('/users');
    } else {
      res.render('users/login', {user: user});
    }
  });
});
