
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');

exports.index = function(req, res){
    if(req.session.userid){
        res.redirect('/feed');
    } else {
        res.render('index', { title: 'Log In to StalkerCentral' });
    }
};

exports.logout = function(req, res,next){
    req.session.userid=null;
    next();
};

exports.admin = function(req, res){
    Settings.findOne({id:req.session.userid}).exec(function(err,docs) {
        res.render('admin', {   title: 'Change My Settings',
                                bgcolor:docs.bgcolor,
                                textcolor:docs.textcolor,
                                textsize:docs.textsize});
    });
};

exports.admin_post = function(req, res){
    console.log(req.body);
    Settings.findOneAndUpdate({id:req.session.userid},{bgcolor:"#"+req.body.bgcolor,
                                                        textcolor:"#"+req.body.textcolor,
                                                        textsize:req.body.textsize+"px",
                                                        }).exec(function(err,docs) {
        if (err) console.log(err);
        res.send("");
    });
};

exports.userExists = function (req,res,next) {
    console.log(req.session.userid);
    if (!req.session.userid) {
        console.log("no user in session");
        req.facebook.api('/me', function(err, data) {
            req.session.userid=req.facebook.user;
            Settings.findOne({id:req.facebook.user}).exec(function(err,docs) {
                if (err) return console.log(err);
                if(!docs) {
                    console.log(docs);
                    console.log("no user in database");
                    if (err) return console.log(err);
                    var newsettings = new Settings({id: req.facebook.user, 
                                                    bgcolor:"#ffffff",
                                                    textcolor:"#000000",
                                                    textsize:12});
                    newsettings.save(function (err) {
                      if (err) console.log(err);
                      console.log("saving newsettings")
                      next();
                    });
                } else {
                    next();
                }
            });
        });
    } else {
        next();
    }
}