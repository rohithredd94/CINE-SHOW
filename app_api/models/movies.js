var mongoose = require( 'mongoose' );

var moviesSchema = new mongoose.Schema({
  overview: String,
  original_language: String,
  original_title: String,
  video: Boolean,
  title: String,
  genre_ids: Array,
  poster_path: String,
  backdrop_path: String,
  release_date: String,
  vote_average: Number,
  popularity: Number,
  id:{
    type: Number,
    required: true
  },
  adult: Boolean,
  vote_count: Number,
  active: Boolean

});

mongoose.model('moviesData', moviesSchema);
