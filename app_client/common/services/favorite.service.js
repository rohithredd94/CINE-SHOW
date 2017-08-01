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

    var getFavorites = function () {
      console.log("User Email: ",$routeParams.user_id);
      return $http.get('/api/favorites/'+$routeParams.user_id , {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      postFavorite : postFavorite,
      getFavorites : getFavorites
    };
  }

})();
