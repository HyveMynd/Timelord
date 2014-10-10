//var Membership = require('user-module');
//var membership = new Membership('membership');
//var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;

var Passport = function(app){
    var self = this;

    // Setup passport
//    passport.use(new LocalStrategy(function (email, password, done) {
//        membership.authenticate(email, password, function (err, authResult) {
//            if (authResult.success){
//                done(null, authResult.user);
//            } else {
//                done(null, false, {message: authResult.message});
//            }
//        })
//    }));
//    passport.serializeUser(function (user, done) {
//        done(null, user.authenticationToken);
//    });
//    passport.deserializeUser(function (token, done) {
//        membership.findByUserToken(token, done);
//    });

    passport.use(new LdapStrategy({
        url: ''
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    return self;
};

module.exports = Passport;