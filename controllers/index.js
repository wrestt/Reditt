app.get('/', function(req, res){
  res.redirect('/posts');
});

require('./posts');
require('./users');
require('./comments');
require('./signups');
require('./logins');

app.get()

app.get('*', function(req,res){
  res.render('404');
});
