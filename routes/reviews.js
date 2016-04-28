const express = require('express'),
      router = express.Router({mergeParams:true}),
      helpers = require('../helpers/authHelpers'),
      knex = require('../db/knex');


router.get('/new',helpers.ensureAuthenticated,(req,res)=>{
	var place = req.params;
	res.render('reviews/new',{place});
});

router.post('/',(req,res)=>{
	req.body.review.user_id = req.user.id;
	req.body.review.place_id = req.params.id;
	console.log(req.body.review);
	knex('reviews').returning('place_id').insert(req.body.review).then(place=>{
		knex('reviews').returning('*').where('place_id',place[0]).limit(5).then(reviews=>{
			var updates = updChk(reviews);
			console.log(updates);
			if (updates['coffee'] > 2){
				knex('places').where('id',place[0]).update('coffee',true);
			}
			if (updates['wifi'] > 2){
				knex('places').where('id',place[0]).update('wifi',true);
			} 
			if (updates['restrooms'] > 2) {
				knex('places').where('id',place[0]).update('restrooms',true);
			}
			res.redirect('/');
		});
	});
});

var updChk = reviews=>{
	return reviews.reduce((acc,review)=>{
		if (!acc['2']) {
			acc['coffee'] = 0;
		}
		if (!acc['0']) {
			acc['wifi'] = 0;
		}
		if (!acc['1']) {
			acc['restrooms'] = 0;
		}
		for(cat in review){
			switch(cat){
			  case '0':
				if (review.cat) {
					acc['wifi'] += 1;
				}
				break;
			  case '2':
				if (review.cat) {
					acc['coffee'] += 1;
				}
				break;
			  case '1':
				if (review.cat) {
					acc['restrooms'] += 1;
				}
				break;
			}
		}
		return acc;
	},{});
};
module.exports = router;