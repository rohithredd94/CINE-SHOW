(function() {

  angular
    .module('meanApp')
    .service('movieData', movieData);

  movieData.$inject = ['$http', 'authentication'];
  function movieData($http, authentication) {

    var getPopularMovie = function () {
      return $http.get('/api/movies/popular', {
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

    return {
      getPopularMovie : getPopularMovie,
      getLatestMovie : getLatestMovie,
      getAll : getAll

    };
  }

})();
