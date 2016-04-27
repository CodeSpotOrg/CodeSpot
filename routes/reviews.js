const express = require('express'),
      router = express.Router({mergeParams:true}),
      helpers = require('../helpers/authHelpers');


router.get('/new',helpers.ensureAuthenticated,(req,res)=>{
	res.render('reviews/new');
});

router.post('/',(req,res)=>{
	knex('reviews').returning('place_id').insert(req.body.review).then(place=>{
		knex('reviews').returning('*').where('place_id',place).limit(5).then(reviews=>{
			var updates = updChk(reviews);
			if (updates['coffee'] > 2){
				knex('places').where('id',place).update('coffee',true);
			}
			if (updates['wifi'] > 2){
				knex('places').where('id',place).update('wifi',true);
			} 
			if (updates['restrooms'] > 2) {
				knex('places').where('id',place).update('restrooms',true);
			}
			res.redirect('/');
		});
	});
});

var updChk = reviews=>{
	return reviews.reduce((acc,review)=>{
		if (!acc['coffee']) {
			acc['coffee'] = 0;
		}
		if (!acc['wifi']) {
			acc['wifif'] = 0;
		}
		if (!acc['restrooms']) {
			acc['restrooms'] = 0;
		}
		for(cat in review){
			switch(cat){
			  case 'wifi':
				if (review.cat) {
					acc['wifi'] += 1;
				}
				break;
			  case 'coffee':
				if (review.cat) {
					acc['coffee'] += 1;
				}
				break;
			  case 'restrooms':
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