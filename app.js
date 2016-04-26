require('dotenv').load();
const express = require("express"),
    app = express(),
    port = 3000 || process.env.PORT
    routes = require('./routes/index'),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    bcryt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
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

app.use('/users',routes.users);
app.use('/places',routes.places);
app.use('/places/:id/reviews',routes.reviews);

app.use(express.static(__dirname + "/public"));

app.get('/',(req,res) => {
  res.render('site_views/index');
});

app.post('/login',passport.authenticate('local-signin',{
  successRedirect: '/good1', 
  failureRedirect: '/bad1', 
  failureFlash: true
})
);

app.post('/register',passport.authenticate('local-signup',{
  successRedirect: '/good2', 
  failureRedirect: '/bad2', 
  failureFlash: true})
);

app.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/failure' }));

app.get('*',(req,res) => {
  res.render('site_views/error');
});

app.listen(port,()=> console.log(`Listening on port ${port}`));
module.exports = app;