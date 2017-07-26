(function () {

  angular
    .module('meanApp')
    .controller('searchCtrl', searchCtrl);

  searchCtrl.$inject = ['$location', 'meanData', 'movieData','authentication'];
  function searchCtrl($location, meanData, movieData, authentication) {
    var vm = this;
    console.log('Search controller activated');
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.movie = {};

    movieData.getAll()
      .success(function(data) {
        console.log("inside get all",data);
        vm.movie = data;
      })
      .error(function (e) {
        console.log(e);
      });



  }

})();