var mongoose = require('mongoose');
var Favorite = mongoose.model('favorites','favorites');

module.exports.postFavorite = function(req, res) {

  Favorite.findOne({ 'user_id': req.body.user_id, 'movie_id':req.body.movie_id }, function (err, favorite) {
  console.log("before working");
  if (err) return handleError(err);

  if(favorite){
    console.log(favorite);
    res.status(404).json({
      "message" : "Already added to favorites"
    });
  }
  else{

  	var newFav = new Favorite({
    "user_id" : req.body.user_id,
    "movie_id" : req.body.movie_id,
    "active": true
	});

    console.log("Data ----",newFav);

	newFav.save(function(err){
		 if (err)
           console.log("Unable to save data");
        else {
           console.log('save Favorite successfully...');
           res.status(200).json("Added a new Favorite");
        }
	   })
  }
 })
};

module.exports.getFavorites = function(req, res) {
 };