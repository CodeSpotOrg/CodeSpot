const localStrategy = require('passport-local').Strategy,
      FacebookStrategy = require('passport-facebook'),
      //githubStrategy = require('passport-github2'),
      bcrypt = require('bcrypt'),
      knex = require('../db/knex'),
      SALT_WORK_FACTOR = 10;

module.exports = function(passport) {
  passport.serializeUser((user,done) => {
    done(null,user.id);
  });
  passport.deserializeUser((id,done) => {  
    knex('users').where('id',id).first().then(user => {
      delete user.password;
      done(null,user);
    }).catch(err => console.log(err));
  });
  passport.use('local-signin', new localStrategy({
    passReqToCallback: true,
    usernameField: 'user[username]',
    passwordField: 'user[password]'
  },
    (req,username,password,done) => {
      req.session.url = req.body.url;
      knex('users').where('username', username).first().then(user => {
        if(!user){
          return done(null,false,{message: 'Invalid username'});
        }
        bcrypt.compare(password,user.password, (err,res) => {
          if (!res) {
            return done(null,false, {message: 'Invalid password'});
          }
          return done(null,user,{message: `Welcome back ${user.username}`})
        });
      }).catch(err => done(err));
    }
  ));
  passport.use('local-signup', new localStrategy({
    passReqToCallback: true,
    usernameField: 'user[username]',
    passwordField: 'user[password]'},
    function (req,username,password,done){
      knex('users').where('username', username).first().then(user => {
        if(user) {
          return done(null,false, {message: 'Usersname already taken'})
        }
        if(password !== req.body.user.confirm) {
          return done(null,false,{message: 'Passwords do not match'})
        }
        bcrypt.hash(password, SALT_WORK_FACTOR, (err,hash) => {
          knex('users').insert ({
            username: username,
            password: hash,
            profile_pic: req.body.user.profile_pic,
            email: req.body.user.email
          }).returning('*').then(user => {
            return done(null, user[0],{message: 'Sign up successful'});
          }).catch(err => done(err));
        });
      })
    }
  ));
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['displayName', 'email', 'photos']
  },
  function(accessToken, refreshToken, profile, done) {
    knex('users').where('email',profile.emails[0].value).first().then (user => {
      if(user) {
        return done (null, user, {message: `Welcome back ${user.username}`});
      }
      knex('users').insert({
        username: profile.displayName,
        email: profile.emails[0].value,
        profile_pic: profile.photos[0]
      }).returning('*').then(user => {
          return done(null, user[0],{message: 'Sign up successful'});
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }));
}