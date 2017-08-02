var mongoose = require('mongoose');
var Favorite = mongoose.model('favorites','favorites');
var Movie = mongoose.model('moviesData','moviesData');

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

  console.log("Inside Controller----");
   if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  else{
    var movieData = [];
    console.log("Inside Get Favorites Else ----");
    Favorite.find({user_id:req.params.user_id}, {movie_id:1, _id:0})
    .exec(function(err, fav) {
          for(var i=0;i < fav.length; i++){
            //console.log(fav[i]['movie_id']);
             Movie.findOne({id:fav[i]['movie_id']})
                .exec(function(err, movie) {
                  //console.log(movie);
                  movieData.push( movie);
                  //console.log(i);
                  //console.log("Movies Inside Loop ---> ",movieData);
                  if(movieData.length == fav.length){
                    console.log("Inside last loop");
                    console.log("Movies ---> ",movieData);
                    res.status(200).json(movieData);

                  }
                }); 
          }
          
        })
       
    }
};

 