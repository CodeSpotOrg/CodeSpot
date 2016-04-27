'use strict'
const express = require('express'),
      router = express.Router({mergeParams:true});

router.get('/',(req,res)=>{
	// console.log('Query:',req.query);
	let place = req.query.place;
	console.log('place:',place);
	if (!(Object.keys(place).length < 2 && !place.criteria)) {
		knex('users').where
	} else {
		// Forrest code goes below
	}
	// res.render('site_views/index');
});

  router.post('/', (req,res) => {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var key = '&key=' + process.env.GOOGLE_MAPS_SERVER_KEY;
    request(url + req.body.address + key, (error, response, data) => {
      if (!error && response.statusCode == 200) {
        knex('places').insert({
          lat: JSON.parse(data).results[0].geometry.location.lat,
          lng: JSON.parse(data).results[0].geometry.location.lng
        });
        res.redirect('/places');
      }
    });
  });

  router.get('/data', (req,res) => {
    knex('places').limit(10).then((places) => {
      res.send({places});
    });
});

module.exports = router;