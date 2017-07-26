(function () {

  angular
  .module('meanApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication','$scope','$log'];
  function loginCtrl($location, authentication,$scope,$log) {
    //$scope.$log = $log;
    //$scope.message = 'Hello';
    console.log("Login Controller Working");
    var vm = this;

    vm.credentials = {
      email : "",
      password : "",
      message:"",
    };

    vm.onSubmit = function () {
      console.log('Inside Submit');
      authentication
        .login(vm.credentials)
        .error(function(err){
          //alert("Incorrect credentials");
          vm.credentials.message = "Incorrect credentials";
        })
        .then(function(){
          $location.path('main');
        });
    };

  }

})();
