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
  knex('places').where('places.id', req.params.id).
  innerJoin('reviews','reviews.place_id','places.id').select('places.*').first()
  .avg('reviews.rating').groupBy('places.id').then(place=>{
    knex('photos').where({place_id:req.params.id}).then(placePhotos=>{
    knex('places as p').select('p.*','r.*').where({'p.id':req.params.id})
     .join('reviews as r','p.id','r.place_id')
<<<<<<< HEAD
     .join('users as u','u.id','r.user_id').select('u.username','u.profile_pic').then(allReviews=> {
        place.avg = Math.round(Number(place.avg));
        allReviews.forEach(review => {
          if(req.isAuthenticated()) {
            if(review.user_id == req.user.id) {
              review.owner = true;
            }
          }
        });
        console.log(allReviews)
=======
     .join('users as u','u.id','r.user_id').select('u.username','u.profile_pic').then(allReviews=>{
      console.log(place)
>>>>>>> b5d3aa3e09e458ae4da0b6bb5958a85baaacb278
        res.render('place_views/show',{reviews:allReviews, photos:placePhotos, thisPlace:place})
      })
    })
  })
});


router.post('/', (req,res) => {
	console.log('review body:',req.body.review)
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  var key = '&key=' + process.env.GOOGLE_MAPS_SERVER_KEY;
  request(url + req.body.place.address + key, (error, response, data) => {
    if (!error && response.statusCode == 200) {
      knex('places').returning('id').insert({
        name: req.body.place.name,
        address: req.body.place.address,
        wifi:req.body.review.wifi,
      	restrooms:req.body.review.restrooms,
      	coffee:req.body.review.coffee,
        lat: JSON.parse(data).results[0].geometry.location.lat,
        lng: JSON.parse(data).results[0].geometry.location.lng
      }).then(placeId=> {
      	knex('reviews').insert({
      		user_id:req.user.id,
      		place_id:placeId[0],
      		content:req.body.review.content,
      		rating:req.body.review.rating,
      		wifi:req.body.review.wifi,
      		restrooms:req.body.review.restrooms,
      		coffee:req.body.review.coffee
      	}).then(()=>{
      		knex('photos').insert({
      			user_id:req.user.id,
      			place_id:placeId[0],
      			url:req.body.photo.url,
      			caption:req.body.photo.caption
      		}).then(()=>{
				res.redirect('/');
      		})

      	})
      })
    }
  });
});




module.exports = router;