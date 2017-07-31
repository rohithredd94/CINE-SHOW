(function () {

  angular
    .module('meanApp')
    .controller('latestCtrl', latestCtrl);

  latestCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice','$rootScope','$window','$timeout','$scope','pager'];
  function latestCtrl($location, meanData, movieData, authentication,searchservice,$rootScope,$window,$timeout,$scope,pager) {
    var vm = this;
    vm.latest = {};
    movieData.getLatestAll()
            .success(function(data){
                console.log("inside get latest all",data);
                vm.latest = data;
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
        vm.pager = pager.GetPager(vm.latest.length, page);

        // get current page of items
        vm.items = vm.latest.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
    }
  }

})();
