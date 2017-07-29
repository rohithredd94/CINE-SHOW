(function() {

  angular
    .module('meanApp')
    .service('genres', genres);

  genres.$inject = ['$http', 'authentication'];
  function genres($http, authentication) {

    var getGenresService = function () {
      return $http.get('/api/genres', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    return {
      getGenresService : getGenresService

    };
  }

})();
