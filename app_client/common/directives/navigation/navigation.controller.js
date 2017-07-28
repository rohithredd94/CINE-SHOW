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
    genres.getGenresService()
      .success(function(data) {
        console.log("inside getGenresService",data);
        vm.genres = data;
      })
      .error(function (e) {
        console.log(e);
      });

  }

})();
