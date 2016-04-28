'use strict'
const express = require('express'),
      router = express.Router({mergeParams:true}),
      request = require('request'),
      knex = require('../db/knex');

router.get('/',(req,res)=>{
	console.log('Query',req.query);
	var place = req.query.place;
	if (place.wifi) {
		knex('places').where('wifi',true).then(wifiPlaces=>{
			return wifiPlaces;
		});
	}
	if (place.coffee) {
		knex('places').where('coffee',true).then(coffeePlaces=>{
			return coffeePlaces;
		});
	}
	if (place.restrooms) {
		knex('places').where('restrooms',true).then(restroomsPlaces=>{
			return restroomsPlaces;
		});
	}
	if (place.criteria) {
		knex('places').where
	}
	var places = {}
	places.wifi = wifiPlaces || 'none';
	places.coffee = coffeePlaces || 'none';
	places.restrooms = restroomsPlaces || 'none'; 
	res.render('place_views/search',{places});
});

router.get("/new",(req,res)=>{
	res.render('place_views/new')
});

router.get('/data', (req,res) => {
  knex('places').limit(10).then((places) => {
    res.send({places});
  });
});

router.get("/:id",(req,res)=>{
  knex('places').where({id:req.params.id}).first().then(place=>{
    knex('photos').where({place_id:req.params.id}).then(placePhotos=>{
    knex('places as p').select('p.*','r.*').where({'p.id':req.params.id})
     .join('reviews as r','p.id','r.place_id')
     .join('users as u','u.id','r.user_id').select('u.username','u.profile_pic').then(allReviews=>{
        res.render('place_views/show',{reviews:allReviews, photos:placePhotos, thisPlace:place})
      })
    })
  })
});

 // .groupBy('places.id','photos.url').orderBy('avg','asc').then(reviews => {
 //   reviews.forEach(review => {
 //     review.avg = Math.round(Number(review.avg));
 //   })
  // knex.select().from('places').where({id:req.params.id}).first().then(function(place){
  //   knex.select().from('reviews').where({place_id:place.id}).then(function(review){
  //     knex.select('user_id').from('reviews').where({place_id:place.id}).then(function(reviewUsers){
  //       var userIds = []
  //       reviewUsers.forEach((user)=>userIds.push(user.user_id))
  //       knex.select('id','username','profile_pic').from('users').whereIn('id', userIds).then(function(user){
  //         res.render('place_views/show',{places:place, reviews:review, users:users})
  //       })
  //     })
  //   })
  // });
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


module.exports = router;