var mongoose = require('mongoose');
var Genres = mongoose.model('genres','genres');

module.exports.getGenres = function(req, res) {
  console.log("cool");
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Genres
      .find()
      .exec(function(err, genres) {
        res.status(200).json(genres);
      });
  }

};
