const express = require('express'),
      router = express.Router({mergeParams:true}),
      helpers = require('../helpers/authHelpers');


router.get('/new',helpers.ensureAuthenticated,(req,res)=>{
	res.render('reviews/new');
});

router.post('/',(req,res)=>{
	knex('reviews').returning('*').insert(req.body.review).limit(5).then(reviews=>{
		reviews.forEach(review=>{
			categoryUpd(review);
			res.redirect('/');
		});
	});
});

var categoryUpd = review=>{
	for(category in review){
		if (category != id && category != content && category != user_id && category != place_id) {
			knex('places').where('id',review.place_id).update(category,review.category);
		}
	}
};
module.exports = router;