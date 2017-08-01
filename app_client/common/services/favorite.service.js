(function() {

  angular
    .module('meanApp')
    .service('favorite', favorite);

  favorite.$inject = ['$http', 'authentication'];
  function favorite($http, authentication) {

    var postFavorite = function (favData) {
      return $http.post('/api/movies/favorite', favData).success(function(data){
        saveToken(data.token);
      });
    };
    return {
      postFavorite : postFavorite
    };
  }

})();
