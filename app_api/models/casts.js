var mongoose = require( 'mongoose' );

var castSchema = new mongoose.Schema({
  cast: Array,
  id:{
    type: Number,
    required: true
  }

});

mongoose.model('cast', castSchema);
