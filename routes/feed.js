var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');

exports.feed = function (req, res) {
  
  Settings.findOne({id:req.session.userid}).exec(function(err,docs) {
    if (err) return console.log(err);
    req.facebook.api('/me/picture?type=large&redirect=false', function(err, data) {
      if (err) return console.log(err);
      console.log(data);
      res.render('feed',{ title:'StalkerCentral',
                          propic:data.data.url,
                          bgcolor:docs.bgcolor,
                          textcolor:docs.textcolor,
                          textsize:docs.textsize
                        });
    });
    req.facebook.api('/me/statuses', function(err, data) {
      if (err) return console.log(err);
      return data.data;
    });
  });
};