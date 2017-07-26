(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl () {
      console.log('Home controller is not running');
      $scope.$log = $log;
      $scope.message = 'Hello';
    }

})();