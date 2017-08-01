var mongoose = require( 'mongoose' );

var reviewsSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  movie_id:{
    type: Number,
    required: true
  },
  review: String,
  rating: Number,
  created_date: Date,
  updated_date: Date

});

mongoose.model('reviews', reviewsSchema);
