(function () {

  angular
    .module('meanApp')
    .controller('searchCtrl', searchCtrl);

  searchCtrl.$inject = ['$location', 'meanData', 'movieData','authentication','searchservice','$rootScope','$window','$timeout','$scope'];
  function searchCtrl($location, meanData, movieData, authentication,searchservice,$rootScope,$window,$timeout,$scope) {
    var vm = this;
    console.log('Search controller activated');
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.movie = {};
    vm.search = {
      query : ""
    };
    vm.searchData = {};
    vm.show = true;

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
      vm.show = false;
      movieData.getSearch(vm.search)
              .success(function(data){
                console.log('success',data.length);
                vm.searchData = data;
                searchservice.addData(vm.searchData);
                $timeout(function(){
                  $rootScope.$broadcast('search_event');
                  $scope.$apply();
                  console.log('Event broadcast complete');
                });
                $location.path('/search');
                //$window.location.assign("/search");
                console.log('After location');
              });
    };
    console.log(vm.search);

    vm.changeFocused = function(){
      $timeout(function(){$scope.focused = false}, 150);
    }
  }

  angular
    .module('meanApp')
    .directive('onFocus', onFocus);

  function onFocus () {
    return {
      restrict: 'EA',
      link: function(scope, elm, attrs) {
            console.log('onfocus');
            elm.bind('focus', function() {
                scope.$apply(attrs.onFocus);
            });
      }
    };
  }

  angular
    .module('meanApp')
    .directive('onBlur', onBlur);

  function onBlur () {
    return {
      restrict: 'EA',
      link: function(scope, elm, attrs) {
            console.log('onblur');
            elm.bind('blur', function() {
                scope.$apply(attrs.onBlur);
            });
      }
    };
  }

})();
