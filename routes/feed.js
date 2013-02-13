var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');

exports.feed = function (req, res) {
  
  Settings.findOne({id:req.session.userid}).exec(function(err,docs) {
    if (err) return console.log(err);
    req.facebook.api('/me?fields=picture.type(large).redirect(false),friends.limit(10).fields(name,photos.limit(1).fields(source,name))', function(err, data) {
      if (err) return console.log(err);
      res.render('feed',{ title:'StalkerCentral',
                          propic:data.picture.data.url,
                          bgcolor:docs.bgcolor,
                          textcolor:docs.textcolor,
                          textsize:docs.textsize,
                          friends:data.friends.data
                        });
    });
  });
};

exports.feed_post = function (req, res) {
  console.log(req.body);
  console.log(req.body.id);
  console.log(req.body.comment);
  req.facebook.api('/'+req.body.id+'/comments','post',{message:req.body.comment}, function(err, data) {
     if (err) return console.log(err);
     res.send("");
  });  
}