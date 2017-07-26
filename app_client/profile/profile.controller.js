(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData','authentication'];
  function profileCtrl($location, meanData, authentication) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
    console.log("Profile controller");
    vm.onClick = function(){
      console.log("Logging Out");
      authentication.logout();
      $location.path("/");
    }
  }

})();