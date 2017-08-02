var mongoose = require('mongoose');
var Review = mongoose.model('reviews','reviews');
var Movie = mongoose.model('moviesData','moviesData');

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

module.exports.getMovieReview = function(req, res){
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    MovieReview = {};
    Review
      .find({user_id:req.payload.email})
      .exec(function(err, data) {
        MovieReview = JSON.parse(JSON.stringify(data));
        dummy = [];
        var len = MovieReview.length;
        MovieReview.forEach(function(value){
          Movie.findOne({id:value['movie_id']})
          .exec(function(err, final) {
            value['movieName'] = final['original_title'];
            dummy.push(value);
            if (dummy.length == len){
                res.status(200).json(dummy);
            }
          });
    });
  });
 }
};
