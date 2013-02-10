
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , Facebook = require('facebook-node-sdk');



var app = express();
var mongoose = require('mongoose');
mongoose.connect((process.env.MONGOLAB_URI||'mongodb://localhost/fb_hw5'));

var models = require('./models/models.js')
  , index = require('./routes/index')
  , feed = require('./routes/feed');

var facebook_obj;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('mtndew'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '504148872964108', secret: 'f458c42209b9ffafe9637c9b7afbee4a' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var scope = {scope:['user_status']};

app.get('/', index.index);
app.get('/logout', index.logout, index.index);
app.get('/admin', Facebook.loginRequired(scope), index.userExists, index.admin);
app.post('/admin', Facebook.loginRequired(scope), index.userExists, index.admin_post);
app.get('/feed', Facebook.loginRequired(scope), index.userExists, feed.feed);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
