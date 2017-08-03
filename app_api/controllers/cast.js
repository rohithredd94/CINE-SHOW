var mongoose = require('mongoose');
var Cast = mongoose.model('cast','cast');

module.exports.getCast = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  }
  else{
  castData = {};
  console.log("Movie ID for Cast:",req.params.id);
  Cast.findOne({id:req.params.id})
    .exec(function(err, cast) {
      console.log("Inside cast Exec");
      castData = JSON.parse(JSON.stringify(cast));
      console.log('----CAST----',castData);
      res.status(200).json(castData);

    });
  }
};

 