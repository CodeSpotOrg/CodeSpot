const express = require('express'),
      router = express.Router({mergeParams:true}),
      helpers = require('../helpers/authHelpers'),
      knex = require('../db/knex');


router.get('/new',helpers.ensureAuthenticated,(req,res)=>{
	var place = req.params;
	res.render('reviews/new',{place});
});

router.post('/',(req,res)=>{
	console.log(req.body);
	req.body.review.user_id = req.user.id;
	req.body.review.place_id = req.params.id;
	knex('reviews').returning('place_id').insert(req.body.review).then(place=>{
		knex('reviews').returning('*').where('place_id',place[0]).orderBy('id','desc').limit(5).then(reviews=>{
			var updates = updChk(reviews);
			if (updates['coffee'] > 2){
				knex('places').where('id',place[0]).update('coffee',true).then(()=>{
					return;
				});
			}
			if (updates['wifi'] > 2){
				knex('places').where('id',place[0]).update('wifi',true).then(()=>{
					return;
				});
			} 
			if (updates['restrooms'] > 2) {
				knex('places').where('id',place[0]).update('restrooms',true).then(()=>{
					return;
				});
			}
			res.redirect('/');
		});
	});
});

var updChk = reviews=>{
	return reviews.reduce((acc,review)=>{
		if (acc['coffee'] === undefined) {
			acc['coffee'] = 0;
		}
		if (acc['wifi'] === undefined) {
			acc['wifi'] = 0;
		}
		if (acc['restrooms'] === undefined) {
			acc['restrooms'] = 0;
		}
		for(cat in review){
			switch(cat){
			  case 'wifi':
				if (review[cat]) {
					acc['wifi'] += 1;
				}
				break;
			  case 'coffee':
				if (review[cat]) {
					acc['coffee'] += 1;
				}
				break;
			  case 'restrooms':
				if (review[cat]) {
					acc['restrooms'] += 1;
				}
				break;
			}
		}
		return acc;
	},{});
};
module.exports = router;