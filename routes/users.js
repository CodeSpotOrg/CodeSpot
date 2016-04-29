const express = require('express'),
      router = express.Router({mergeParams:true}),
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10,
      passport = require('passport'),
      knex = require('../db/knex'),
      authHelpers = require('../helpers/authHelpers');
require('../config/passport')(passport);

router.get('/:id', authHelpers.ensureAuthorized, (req,res) => {
  knex('users').where('id', req.params.id).first().then(user => {
    if (user) {
      knex('reviews').where('user_id',user.id).innerJoin('places','places.id','reviews.place_id')
      .then(reviews => {

        Promise.all(reviews.map(review => {
          return knex('photos').where('photos.place_id',review.place_id).first().then(photo => {
            review.photo = photo.url;
          }).catch(err => err)
        })).then(()=> {
          res.render('user_views/show',{user,reviews});
        });
      })
    }
    else {
      res.redirect('/');
    }
  })
});

router.post('/',passport.authenticate('local-signup',{failureFlash: true}, (req,res) => {
  res.redirect(req.url); 
})
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

router.delete('/:id',(req,res) => {
  knex('users').where('id',req.params.id).del().then (() => {
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;