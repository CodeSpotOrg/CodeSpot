const express = require('express'),
      router = express.Router({mergeParams:true}),
      authHelpers = require('../helpers/authHelpers'),
      passport = require('passport');
require('../config/passport')(passport);


router.post('/login', authHelpers.setRedirect, passport.authenticate('local-signin',{successRedirect: '/auth/login/success',
                                         failureRedirect: '/auth/login/failure',
                                         failureFlash: true})
);
router.get('/login/success', (req,res) => {
  req.flash('msg', 'Login successful')
  res.redirect(req.session.url);
});

router.get('/login/failure', (req,res) => {
  req.flash('msg', 'Invalid username/password')
  // console.log(req.flash('msg')console.log(req.flash('msg'))
  res.redirect(req.session.url);
});

router.get('/login/facebook/failure', (req,res) => {
  req.flash('msg', 'Login failed: Create a local account or try again later')
  res.redirect(req.session.url);
});

router.post('/facebook', authHelpers.setRedirect, (req,res) => {
  res.redirect('/auth/facebook');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/auth/login/success',
                                      failureRedirect: '/login/failure' })
);

router.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;