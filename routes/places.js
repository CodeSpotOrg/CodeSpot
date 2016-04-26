const express = require('express'),
      router = express.Router({mergeParams:true});

  router.post('places/', (req,res) => {
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
module.exports = router;