(function() {

  angular
    .module('meanApp')
    .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = ['$location', 'meanData', 'movieData','authentication'];
  function mainCtrl($location, meanData, movieData, authentication) {
    var vm = this;

    // vm.user = {};

    // meanData.getMain()
    //   .success(function(data) {
    //     vm.user = data;
    //   })
    //   .error(function (e) {
    //     console.log(e);
    //   });
    vm.user = {};
    vm.movie = {};
    vm.latest = {};
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
    movieData.getPopularMovie()
      .success(function(data) {
        console.log("inside get popular",data);
        vm.movie = data;
      })
      .error(function (e) {
        console.log(e);
      });
    movieData.getLatestMovie()
      .success(function(data) {
        console.log("inside get latest",data);
        vm.latest = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();
