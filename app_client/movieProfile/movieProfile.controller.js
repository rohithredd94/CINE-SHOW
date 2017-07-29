(function() {

  angular
    .module('meanApp')
    .controller('movieCtrl', movieCtrl);

  movieCtrl.$inject = ['$location', 'meanData', 'movieData','authentication'];
  function movieCtrl($location, meanData, movieData, authentication) {
    var vm = this;
    vm.user = {};
    vm.movie = {};
    meanData.getProfile()
      .success(function(data) {
        console.log("inside get popular-2",data);
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
    console.log("Inside Main Controller");
    vm.onClick = function(){
      console.log("Logging Out");
      authentication.logout();
      $location.path("/");
    }
    vm.onClickProfile = function(){
      // console.log("Logging Out");
      // authentication.logout();
      $location.path("/profile");
    }
    movieData.getMovieProfile()
      .success(function(data) {
        console.log("inside get popular",data);
        vm.movie = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();
