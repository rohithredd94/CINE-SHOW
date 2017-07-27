var mongoose = require('mongoose');
var Movie = mongoose.model('moviesData','moviesData');

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
  console.log('All Movies',req.body);
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
