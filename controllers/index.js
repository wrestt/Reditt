app.get('/', function(req, res){
  res.redirect('./posts');
});

require('./posts');
require('./users');
require('./comments');

app.get('*', function(req,res){
  res.render('404');
});
