(function () {

  angular
    .module('meanApp')
    .controller('popularCtrl', popularCtrl);
  
  popularCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice','$rootScope','$window','$timeout','$scope','pager'];
  function popularCtrl($location, meanData, movieData, authentication,searchservice,$rootScope,$window,$timeout,$scope,pager) {
    var vm = this;
    vm.movie = {};
    movieData.getPopularAll()
            .success(function(data){
                console.log("inside popular all",data);
                vm.movie = data;
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
        vm.pager = pager.GetPager(vm.movie.length, page);
 
        // get current page of items
        vm.items = vm.movie.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
    }
  }

})();