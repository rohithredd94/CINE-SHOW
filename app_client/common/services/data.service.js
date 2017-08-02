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

    var uploadFile = function(file) {
      
      var fd = new FormData();
      fd.append('file', file);
      console.log(fd);
      var info = {msg:"Hello"};
      return $http.post('/api/profile/file', info, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });

    };

    return {
      getProfile : getProfile,
      storeUpdateUser : storeUpdateUser,
      uploadFile : uploadFile
    };
  }

})();
