require('dotenv').load();
const express = require("express"),
    app = express(),
    port = 3000 || process.env.PORT,
    SALT_WORK_FACTOR = 10,
    routes = require('./routes/index'),
    authHelpers = require('./helpers/authHelpers'),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    bcryt = require('bcrypt'),
    session = require('cookie-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    knex = require('./db/knex'),
    morgan = require("morgan"); 

app.set('view engine', 'jade');
app.set('views',__dirname + '/views');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

require('./config/passport')(passport);
app.use(session({secret:process.env.SECRET}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + "/public"));

app.use(authHelpers.idUser);
app.use(authHelpers.showFlashMessage);
app.use('/users',routes.users);
app.use('/places',routes.places);
app.use('/places/:id/reviews',routes.reviews);
app.use('/auth',routes.auth);

app.get('/',(req,res) => {
  knex('places').select('places.*').avg('reviews.rating')
  .innerJoin('reviews','places.id','reviews.place_id')
  .groupBy('places.id').orderBy('places.id').then(reviews => {
    Promise.all(reviews.map(review => {
      review.avg = Math.round(Number(review.avg));
      return knex('photos').where('photos.place_id',review.id).first().then(photo => {
        review.photo = photo.url;
      }).catch(err => err)
    })).then(()=> {
      console.log(reviews)
     res.render('site_views/index',{key: process.env.GOOGLE_MAPS_SERVER_KEY, reviews});
    });
  });
});
  
app.get('*',(req,res) => {
  res.render('site_views/error');
});

app.listen(port,()=> console.log(`Listening on port ${port}`));
module.exports = app;