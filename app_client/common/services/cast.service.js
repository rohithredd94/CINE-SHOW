(function() {

  angular
    .module('meanApp')
    .service('cast', cast);

  cast.$inject = ['$http', 'authentication','$route','$routeParams'];
  function cast($http, authentication,$route,$routeParams) {

    var getCast = function (id) {
      return $http.get('/api/movies/cast/'+$routeParams.id, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      getCast : getCast
    };
  }

})();
