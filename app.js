var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var db = require('./models');

app = express();

app.set('view engine', 'ejs');
app.use(express_static(_dirname + '/public'));
app.use(bodyParser.urlencoced({extended:true}));
app.use(methodOverride('_method'));

require('./controllers/index');

app.listen(3000, function(){
  console.log('server is listening on port 3000')
})
