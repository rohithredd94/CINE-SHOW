(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','genres','authentication'];
  function navigationCtrl($location, genres, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.genres = {};

    vm.test = [];

    genres.getGenresService()
      .success(function(data) {
        console.log("inside getGenresService");
        for (var i = 0; i < data.length; i=i+4) {
          temp = []
          temp.push(data[i]);
          temp.push(data[i+1]);
          temp.push(data[i+2]);
          temp.push(data[i+3]);
          vm.test.push(temp);
        }
        console.log(vm.test);
        vm.genres = data;
      })
      .error(function (e) {
        console.log(e);
      });

        vm.onClick = function(){
      console.log("Logging Out");
      authentication.logout();
      $location.path("/");
    }
    vm.onClickProfile = function(){
      console.log("clicking profile");
      // authentication.logout();
      $location.path("/profile");
    }
  }
})();
