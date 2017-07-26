var mongoose = require( 'mongoose' );

var genresSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

mongoose.model('genres', genresSchema);
