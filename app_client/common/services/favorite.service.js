(function() {

  angular
    .module('meanApp')
    .service('favorite', favorite);

  favorite.$inject = ['$http', 'authentication','$route','$routeParams'];
  function favorite($http, authentication,$route,$routeParams) {

    var postFavorite = function (favData) {
      return $http.post('/api/movies/favorite', favData).success(function(data){
        saveToken(data.token);
      });
    };

    var getFavorites = function (id) {
      //console.log("User Email: ",$routeParams.user_id);
      return $http.get('/api/favorites/'+$routeParams.user_id, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var deleteFavorite = function (favdata) {
       return $http.post('/api/favorites/delete', favdata).success(function(data){
        saveToken(data.token);
      });
    };

    return {
      postFavorite : postFavorite,
      getFavorites : getFavorites,
      deleteFavorite : deleteFavorite
    };
  }

})();
