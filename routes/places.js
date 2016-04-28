'use strict'
const express = require('express'),
      router = express.Router({mergeParams:true}),
      request = require('request'),
      knex = require('../db/knex');

router.get('/',(req,res)=>{
  res.send('good')
	// knex('places').where()
});

router.get("/new",(req,res)=>{
	res.render('place_views/new')
});

router.post('/', (req,res) => {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var key = '&key=' + process.env.GOOGLE_MAPS_SERVER_KEY;
  request(url + req.body.place.address + key, (error, response, data) => {
    if (!error && response.statusCode == 200) {
      knex('places').insert({
        name: req.body.place.name,
        address: req.body.place.address,
        lat: JSON.parse(data).results[0].geometry.location.lat,
        lng: JSON.parse(data).results[0].geometry.location.lng
      }).then(()=> {
        res.redirect('/places');
      })
    }
  });
});

  router.get('/data', (req,res) => {
    knex('places').limit(10).then((places) => {
      res.send({places});
    });
});

module.exports = router;