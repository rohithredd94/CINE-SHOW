(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var storeUpdateUser = function (user) {
      return $http.post('/api/profile', user, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });

    };

    return {
      getProfile : getProfile,
      storeUpdateUser : storeUpdateUser
    };
  }

})();
