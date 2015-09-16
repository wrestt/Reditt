var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var db = require('./models');

loginMiddleware = require("./middleware/loginHelpers");
routeMiddleware = require("./middleware/routeHelpers");
moment = require('moment');
app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
  maxAge: 3600000,
  secret: 'youllnevergetthis',
  name: "user"
}));
app.use(loginMiddleware);

require('./controllers/index');

app.listen(3000, function(){
  console.log('server is listening on port 3000');
});
