var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlMovies = require('../controllers/movie');
var ctrlGenres = require('../controllers/genre');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//movies data
router.get('/movies/popular', auth, ctrlMovies.getPopular);
router.get('/movies/latest', auth, ctrlMovies.getLatest);
router.get('/movies/', auth, ctrlMovies.getAll);
router.post('/movies/', auth, ctrlMovies.getSearch);

//genres
router.get('/genres',auth, ctrlGenres.getGenres);

module.exports = router;
