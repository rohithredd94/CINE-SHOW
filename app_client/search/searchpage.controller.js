(function () {

  angular
    .module('meanApp')
    .controller('searchPageCtrl', searchPageCtrl);

  searchPageCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice','$rootScope','pager','$scope','$anchorScroll'];
  function searchPageCtrl($location, meanData, movieData, authentication,searchservice, $rootScope,pager,$scope,$anchorScroll) {
    var vm = this;
    console.log('Search  Page controller activated');
    /*vm.isLoggedIn = authentication.isLoggedIn();

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
    console.log(vm.search);*/
    vm.dummyItems = [];
    vm.searchData = {};
    for (var i = 1; i <= 151; i++) {
        vm.dummyItems.push(i);
    }

    console.log(vm.dummyItems);


    vm.searchData = searchservice.getData();
    vm.pager = {};
    vm.setPage = setPage;

    initController();

    $rootScope.$on('search_event',function(){
      console.log('Event Triggered');
      vm.searchData = searchservice.getData();
      console.log(vm.searchData);
      vm.pager = {};
      vm.setPage = setPage;

      initController();
    });

    //For pager
    // vm.dummyItems = _.range(1, 151); // dummy array of items to be paged

    function initController() {
        // initialize to page 1
        vm.setPage(1);
    }


    function setPage(page) {

        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }

        // get pager object from service
        vm.pager = pager.GetPager(vm.dummyItems.length, page);

        // get current page of items
        vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);

        // get pager object from service
        vm.pager = pager.GetPager(vm.searchData.length, page);

        // get current page of items
        vm.items = vm.searchData.slice(vm.pager.startIndex, vm.pager.endIndex + 1);

        $location.hash('top');
        $anchorScroll();
    }


  }

})();
