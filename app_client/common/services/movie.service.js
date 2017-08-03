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
    var getTopratedAll = function () {
      return $http.get('/api/movies/topratedAll', {
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

    var getGenreData = function(id){
      return $http.get('/api/genres/'+id , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var updateMovie = function(data){
      return $http.post('/api/movies/update/', data , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var deleteMovie = function(id){
      return $http.get('/api/movies/delete/'+id , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var showMovie = function(id){
      return $http.get('/api/movies/show/'+id , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var addMovie = function(data){
      console.log(data);
      return $http.post('/api/movies/add/', data , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    var addCast = function(data){
      return $http.post('/api/movies/addCast/', data , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }


    console.log("Hello",getMovieProfile);
    return {
      getPopularMovie : getPopularMovie,
      getLatestMovie : getLatestMovie,
      getAll : getAll,
      getSearch : getSearch,
      getMovieProfile : getMovieProfile,
      getPopularAll : getPopularAll,
      getLatestAll : getLatestAll,
      getTopratedAll : getTopratedAll,
      getGenreData : getGenreData,
      updateMovie : updateMovie,
      deleteMovie : deleteMovie,
      showMovie : showMovie,
      addMovie : addMovie,
      addCast : addCast
    };
  }

})();
