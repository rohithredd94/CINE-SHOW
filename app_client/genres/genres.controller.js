(function () {

  angular
    .module('meanApp')
    .controller('genresCtrl', genresCtrl);
  
  genresCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice','$rootScope','$window','$timeout','$scope','pager','$anchorScroll'];
  function genresCtrl($location, meanData, movieData, authentication,searchservice,$rootScope,$window,$timeout,$scope,pager,$anchorScroll) {
    var vm = this;
    vm.movie = {};
    vm.genreid = $location.path().split("/")[2];
    vm.infomsg = "";
    movieData.getGenreData(vm.genreid)
            .success(function(data){
                vm.movie = data;
                vm.pager = {};
                vm.setPage = setPage;
                if(vm.movie.length == 0){
                    vm.infomsg = "No movies in this genre";
                }
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
        $location.hash('top');
        $anchorScroll();
    }
  }

})();