var mongoose = require( 'mongoose' );

var favoritesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  } , 
  movie_id:{
    type: Number,
    required: true
  } ,
  active: Boolean

});

mongoose.model('favorites', favoritesSchema);