(function () {

  angular
    .module('meanApp')
    .controller('allMoviesCtrl', allMoviesCtrl);

  allMoviesCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice','$rootScope','$window','$timeout','$scope','pager','$anchorScroll'];
  function allMoviesCtrl($location, meanData, movieData, authentication,searchservice,$rootScope,$window,$timeout,$scope,pager,$anchorScroll) {
    var vm = this;
    vm.all = {};
    movieData.getAllMovies()
            .success(function(data){
                console.log("inside get latest all",data);
                vm.all = data;
                vm.pager = {};
                vm.setPage = setPage;

                initController();
            })
            .error(function (e) {
              console.log(e);
            });



    function initController() {
        // initialize to page 1
        vm.setPage(1);
    }

    function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }

        // get pager object from service
        //vm.pager = pager.GetPager(vm.dummyItems.length, page);

        // get current page of items
        //vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);

        // get pager object from service
        vm.pager = pager.GetPager(vm.all.length, page);

        // get current page of items
        vm.items = vm.all.slice(vm.pager.startIndex, vm.pager.endIndex + 1);

        $location.hash('top');
        $anchorScroll();
    }
  }

})();
