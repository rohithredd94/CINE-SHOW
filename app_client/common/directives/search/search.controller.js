(function () {

  angular
    .module('meanApp')
    .controller('searchCtrl', searchCtrl);

  searchCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice'];
  function searchCtrl($location, meanData, movieData, authentication,searchservice) {
    var vm = this;
    console.log('Search controller activated');
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.movie = {};
    vm.search = {
      query : ""
    };
    vm.searchData = {};

    movieData.getAll()
      .success(function(data) {
        console.log("inside get all",data);
        vm.movie = data;
      })
      .error(function (e) {
        console.log(e);
      });
    console.log(vm.search);
    vm.onSearch = function(){
      movieData.getSearch(vm.search)
              .success(function(data){
                console.log('success',data.length);
                vm.searchData = data;
                searchservice.addData(vm.searchData);
                $location.path('/search');
                console.log('After location',vm.searchData);
              });
    };
    console.log(vm.search);



  }

})();