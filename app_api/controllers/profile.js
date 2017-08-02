var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {
  console.log("inside Profile read");
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

module.exports.updateUser = function(req, res) {
  console.log('Update User Data',req.body);
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {//new RegExp('^'+req.body.query+'$', "i")

      /*var query = { email: req.body.email};
      var options = {};
      if (req.body.password != ""){
        console.log("in");
        //req.body.setPassword(req.body.password);
        var user = new User();
        user._id = req.body._id;
        user.name = req.body.name;
        user.email = req.body.email;
        user.bio = req.body.bio;
        console.log(user);
      }

      User.update(user_id, {name: req.body.name, bio: req.body.bio}, options, callback);

      function callback (err, numAffected) {

          res.status(200).json("User Updated");


      }*/

      User.findOne({email:req.body.email})
      .exec(function(err,user){
        if(user){
          user.name = req.body.name;
          user.bio = req.body.bio;
          if(req.body.password){
            user.setPassword(req.body.password);
          }
          user.save(function(err){
            res.status(200).json("User Updated");
          })
        }
      });

  }

};
