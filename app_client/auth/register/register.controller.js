(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;
    console.log("Initialized credentials");
    vm.credentials = {
      name : "",
      email : "",
      password : "",
      message:""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          console.log(err.message);
          if(err.message = "User Already exists")
            vm.credentials.message = "User Already Exists";
        })
        .success(function(){
          $location.path('main');
        });
        // .then(function(){
        //   console.log("Inside the function");
        //   if(!authentication.isLoggedIn())
        //    $location.path('/');
        //  else
        //   $location.path('profile');
        // })

    };

  }

})();
