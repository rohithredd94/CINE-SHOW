var mongoose = require('mongoose');
var monk = require('monk');
var Movie = mongoose.model('moviesData','moviesData');
var Cast = mongoose.model('cast','cast');
var Genre = mongoose.model('genres','genres');
var ReviewData = mongoose.model('reviews','reviews');
var db = monk('localhost:27017/movies');


module.exports.getPopular = function(req, res) {
  var tempdate = new Date();
  tempdate.setDate(tempdate.getDate() - 30);
  tempdate = tempdate.toISOString();
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find({release_date :{"$gte": tempdate}}).sort( { vote_average: -1 } ).limit(8)
      .exec(function(err, movie) {

        res.status(200).json(movie);
      });
  }

};

module.exports.getPopularAll = function(req, res) {
  var currentdate = new Date().toISOString();
  var tempdate = new Date();
  tempdate.setDate(tempdate.getDate() - 30);
  tempdate = tempdate.toISOString();
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find({release_date :{"$gte": tempdate}}).sort( { vote_average: -1} )
      .exec(function(err, movie) {
        console.log(movie);
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
         movieData['reviews'] = {};
         ReviewData.find({movie_id:req.params.id}).sort({created_date: -1}).limit(5)
         .exec(function(err,review){
            movieData['reviews'] = review;
            console.log(movieData);
            //res.status(200).json(movieData);
         })
      })
      .then(function(){
        movieData['genre'] = genres;
        movieData['cast'] = {};

        Cast.findOne({id:req.params.id})
          .exec(function(err, cast) {
            movieData['cast'] = cast['cast'];
            console.log('----CAST----',cast['cast']);
            res.status(200).json(movieData);

          });
      });
  }
};

module.exports.getLatestAll = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find().sort( { release_date: -1 } )
      .exec(function(err, movie) {

        res.status(200).json(movie);
      });
}
};
module.exports.getTopratedAll = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Movie
      .find().sort( { vote_average: -1 } )
      .exec(function(err, movie) {

        res.status(200).json(movie);
      });
}
};

module.exports.getGenreData = function(req, res) {
  console.log("inside genre data");
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
      var id = parseInt(req.params.id);
      Movie
      .find({genre_ids:id})
      .exec(function(err, movies){
        res.status(200).json(movies);
      });
  }

};
module.exports.updateMovie = function(req, res) {
  console.log("inside update Movie");
  var info = {msg: "Success"};
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
      // var id = parseInt(req.params.id);
      // Movie
      // .find({genre_ids:id})
      // .exec(function(err, movies){
      //   res.status(200).json(movies);
      // });
      console.log("got movie", req.body);
      /*var collection = db.get('moviesData');

      collection.update(
      {
        _id: req.body._id
      },
      {
        title: req.body.title,
        overview: req.body.overview,
        genre_ids: req.body.genre_ids,
        release_date: req.body.release_date,
        image: req.body.image,
        original_title: req.body.original_title,
        original_language: req.body.original_language,
        video: req.body.video,
        poster_path: req.body.poster_path,
        vote_average: req.body.vote_average,
        popularity: req.body.popularity,
        id: req.body.id,
        adult: req.body.adult,
        active: req.body.active,
        vote_count: req.body.vote_count
      },function(err, movie){
        if(err) throw err;
        res.status(200).json(info);
      });*/
      Movie.findOne({id:req.body.id})
      .exec(function(err, movie){
        if(movie){
          movie.title = req.body.title;
          movie.overview = req.body.overview;
          movie.genre_ids = req.body.genre_ids;
          movie.release_date = req.body.release_date;
          movie.image = req.body.image;
          movie.save(function(err){
            res.status(200).json("Movie Updated");
          })
        }
      })


  }

};

