'use strict'
const express = require('express'),
      router = express.Router({mergeParams:true}),
      request = require('request'),
      knex = require('../db/knex');

router.get('/',(req,res)=>{
	// console.log('Query',req.query);
	var place = req.query.place;
	var places = {};

	if (place.wifi) {
		knex('places').where('wifi',true).then(wifiPlaces=>{
			places.wifi = wifiPlaces;
			console.log('Places view from wifi:',places);
			if (place.coffee) {
				knex('places').where('coffee',true).then(coffeePlaces=>{
					places.coffee = coffeePlaces;
					if (place.restrooms) {
						knex('places').where('restrooms',true).then(restroomsPlaces=>{
							places.restrooms = restroomsPlaces;
							if (place.criteria) {
								knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
									console.log(name);
									places.criteria = name;
									res.render('place_views/search',{places});
								});
							} else {
								res.render('place_views/search',{places});
							}
						});
					} else if(place.criteria){
						knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
							console.log(name);
							places.criteria = name;
							res.render('place_views/search',{places});
						});
					} else {
						res.render('place_views/search',{places});
					}
				});
			} else if (place.restrooms) {
				knex('places').where('restrooms',true).then(restroomsPlaces=>{
					places.restrooms = restroomsPlaces;
					if (place.criteria) {
						knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
							console.log(name);
							places.criteria = name;
							res.render('place_views/search',{places});
						});
					} else {
						res.render('place_views/search',{places});
					}
				});
			} else if(place.criteria){
				knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
					console.log(name);
					places.criteria = name;
					console.log('What I am sending:',places);
					res.render('place_views/search',{places});
				});
			} else{
				// console.log('What I am sending:',places);
				res.render('place_views/search',{places});
			}
		});
	} else if (place.coffee) {
		knex('places').where('coffee',true).then(coffeePlaces=>{
			places.coffee = coffeePlaces;
			if (place.restrooms) {
				knex('places').where('restrooms',true).then(restroomsPlaces=>{
					places.restrooms = restroomsPlaces;
					if (place.criteria) {
						knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
							console.log(name);
							places.criteria = name;
							res.render('place_views/search',{places});
						});
					} else {
						res.render('place_views/search',{places});
					}
				});
			} else if (place.criteria) {
				console.log(place.criteria);
				knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
					console.log(name);
					places.criteria = name;
					res.render('place_views/search',{places});
				});
			} else {
				res.render('place_views/search',{places});
			}
		});
	} else if (place.restrooms) {
		knex('places').where('restrooms',true).then(restroomsPlaces=>{
			places.restrooms = restroomsPlaces;
			if (place.criteria) {
				knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
					console.log(name);
					places.criteria = name;
					res.render('place_views/search',{places});
				});
			} else {
				res.render('place_views/search',{places});
			}
		});
	} else if (place.criteria) {
		knex('places').where('name', 'like', `%${place.criteria}%`).then(name=>{
			console.log(name);
			places.criteria = name;
			res.render('place_views/search',{places});
		});
	} else {
		res.render('place_views/search',{places});
	}
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