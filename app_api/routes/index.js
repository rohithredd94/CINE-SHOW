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
var ctrlReview = require('../controllers/review');
var ctrlFav = require('../controllers/favorite');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/profile', auth, ctrlProfile.updateUser);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//movies data
router.get('/movies/popular', auth, ctrlMovies.getPopular);
router.get('/movies/latest', auth, ctrlMovies.getLatest);
router.get('/movies/latestAll', auth, ctrlMovies.getLatestAll);
router.get('/movies/', auth, ctrlMovies.getAll);
router.post('/movies/', auth, ctrlMovies.getSearch);
router.get('/movies/popularAll', auth, ctrlMovies.getPopularAll);
router.get('/movies/topratedAll', auth, ctrlMovies.getTopratedAll);

router.post('/movies/', auth, ctrlMovies.getSearch);

//genres
router.get('/genres',auth, ctrlGenres.getGenres);
router.get('/genres/:id',auth, ctrlMovies.getGenreData);
router.get('/movies/:id', auth, ctrlMovies.getMovieProfile);
//router.get('/movies/cast/:id', auth, ctrlCast.getCastByMovie);
router.post('/movies/review',  ctrlReview.postMovieReview);
router.post('/movies/favorite',  ctrlFav.postFavorite);
router.get('/favorites/:userid',ctrlFav.getFavorites);

module.exports = router;
