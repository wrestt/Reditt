app.get('/', function(req, res){
  res.redirect('/posts');
});

require('./posts');
require('./users');
require('./comments');
require('./signups');
require('./logins');

<<<<<<< HEAD
// app.get()
=======
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
>>>>>>> aeef20a338d91a387f4d7216ad0fd361c6d89289

app.get('*', function(req,res){
  res.render('404');
});
