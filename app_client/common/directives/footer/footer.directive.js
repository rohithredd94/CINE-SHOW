(function () {

  angular
    .module('meanApp')
    .directive('foot', foot);

  function foot () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/footer/footer.template.html',
      //controller: 'navigationCtrl as navvm'
    };
  }

})();
