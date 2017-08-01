var mongoose = require('mongoose');
var Review = mongoose.model('reviews','reviews');

module.exports.postMovieReview = function(req, res) {

  
  var tempdate = new Date();
  tempdate.setDate(tempdate.getDate());
  tempdate = tempdate.toISOString();

  	var newReview = new Review({
    "user_id" : req.body.email,
    "name" : req.body.name,
    "movie_id" : req.body.id,
    "review" : req.body.review,
    "rating" : req.body.rating,
    "created_date" : tempdate,
    "updated_date" : null
	});
	console.log("User name ----> ",req.body.name);
	console.log("Data ----",newReview);

	newReview.save(function(err){
		 if (err)
           console.log("Unable to save data");
        else {
           console.log('save user successfully...');
           res.status(200).json("Comment");
        }
	})


    // Movie
    //   .find({release_date :{"$gte": tempdate}}).sort( { vote_average: -1 } ).limit(8)
    //   .exec(function(err, movie) {

    //     res.status(200).json(movie);
    //   });

};