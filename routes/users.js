const express = require('express'),
      router = express.Router({mergeParams:true}),
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10,
      knex = require('../db/knex');
//show edit new

router .get('/:id', (req,res) => {
  res.render('user_views/show');
});

router.post('/',passport.authenticate('local-signup',{
  successRedirect: req.url, 
  failureRedirect: req.url, 
  failureFlash: true})
);


router.put('/:id', (req,res) => {
  if (!password) {
    knex('users').where('id',req.params.id).update({
      email: req.body.user.email,
      profile_pic: req.body.user.profile_pic
    });
  }
  else if (req.body.user.password === req.body.user.confirm) {
    bcrypt.hash(req.body.user.password, SALT_WORK_FACTOR, (err,hash) => {
      knex('users').where('id',req.params.id).update({
        email: req.body.user.email,
        password: hash,
        profile_pic: req.body.user.profile_pic
      });
    });
  }
  res.redirect(`/users/${req.params.id}`);
});
module.exports = router;