const express = require('express'),
      router = express.Router({mergeParams:true}),
      passport = require('passport');
require('../config/passport')(passport);


router.post('/login', passport.authenticate('local-signin',{successRedirect: '/auth/login',
                                         failureRedirect: '/auth/login',
                                         failureFlash: true})
);
router.get('/login', (req,res) => {
  res.redirect(req.session.url);
});

router.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' })
);




module.exports = router;