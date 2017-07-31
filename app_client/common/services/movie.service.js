(function() {

  angular
    .module('meanApp')
    .service('movieData', movieData);

  movieData.$inject = ['$http', 'authentication','$route','$routeParams'];
  function movieData($http, authentication,$route,$routeParams) {

    var getPopularMovie = function () {
      return $http.get('/api/movies/popular', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var getPopularAll = function () {
      return $http.get('/api/movies/popularAll', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var getLatestMovie = function () {
      return $http.get('/api/movies/latest', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var getAll = function () {
      return $http.get('/api/movies', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getSearch = function(search){
      console.log('Inside Get Search',search);
      return $http.post('/api/movies', search, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });

    };

    var getLatestAll = function () {
      console.log("inside getLatestAll")
      return $http.get('/api/movies/latestAll', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var getMovieProfile = function () {
      console.log("ID: ",$routeParams.id);
      return $http.get('/api/movies/'+$routeParams.id , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };


    console.log("Hello",getMovieProfile);
    return {
      getPopularMovie : getPopularMovie,
      getLatestMovie : getLatestMovie,
      getAll : getAll,
      getSearch : getSearch,
      getMovieProfile : getMovieProfile,
      getPopularAll : getPopularAll,
      getLatestAll : getLatestAll
    };
  }

})();
