
(function () {

  angular
    .module('meanApp')
    .directive('search', search);

  function search () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/search/search.template.html',
      //controller: 'navigationCtrl as navvm'
    };
  }

})();
