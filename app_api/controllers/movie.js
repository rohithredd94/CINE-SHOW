var mongoose = require('mongoose');
var Movie = mongoose.model('moviesData','moviesData');
var Cast = mongoose.model('cast','cast');
var Genre = mongoose.model('genres','genres');

module.exports.getPopular = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find().sort( { vote_average: -1 } ).limit(8)
      .exec(function(err, movie) {

        res.status(200).json(movie);
      });
  }

};

module.exports.getLatest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find().sort( { release_date: -1 } ).limit(8)
      .exec(function(err, movie) {

        res.status(200).json(movie);
      });
}
};

module.exports.getAll = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find()
      .exec(function(err, movie) {

        res.status(200).json(movie);
      });
  }

};

module.exports.getSearch = function(req, res) {
  console.log('Get Search',req.body.query);
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {//new RegExp('^'+req.body.query+'$', "i")
    Movie
      .find({title:new RegExp(req.body.query, 'i')})
      .exec(function(err, movie) {
        console.log(movie);
        res.status(200).json(movie);
      });
  }

};

module.exports.getMovieProfile = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
     var movieData = {};
     var genres = [];
     Movie
      .findOne({id:req.params.id})
      .exec(function(err, movie) {
        movieData = JSON.parse(JSON.stringify(movie));
        movieData['genre'] = [];
        movieData['genre_ids'].forEach(function(value){
          //console.log(value);
          Genre.findOne({id:value})
          .exec(function(err,genre){
            //console.log(genre['name']);
            //movieData['genre'] = genre['name'];
            genres.push(genre['name']);
          })
        });
       // res.status(200).json(movie);
      })
      .then(function(){
        movieData['genre'] = genres;
        movieData['cast'] = {};
        Cast.findOne({id:req.params.id})
          .exec(function(err, cast) {
          //console.log(cast);
          movieData['cast'] = cast['cast'];
          //movieData['genres'] = genres;
          console.log(movieData);
          res.status(200).json(movieData);
          });
      });



  }

};
