(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;
    vm.passStrength = "";
    console.log("Initialized credentials");
    vm.credentials = {
      name : "",
      email : "",
      password : "",
      message:""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      var stroPattern = /^([a-zA-Z0-9*_@!#$%&]+$)/;
      if(stroPattern.test(vm.credentials.password)){
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
      }else{
        vm.passStrength = "Invalid Characters entered";
      }
      
        // .then(function(){
        //   console.log("Inside the function");
        //   if(!authentication.isLoggedIn())
        //    $location.path('/');
        //  else
        //   $location.path('profile');
        // })

    };

    vm.checkPass = function(){
      //console.log(vm.credentials.password);
      var pass = vm.credentials.password;
      var weakPattern = /^([a-zA-Z]+$)/;
      var medPattern = /^([a-zA-Z0-9]+$)/;
      var stroPattern = /^([a-zA-Z0-9*_@!#$%&]+$)/;
      if(pass.length < 6){
        console.log("Too weak");
        vm.passStrength = "Too Weak";
      }else if(weakPattern.test(pass)){
        vm.passStrength = "Weak";
      }else if(medPattern.test(pass)){
        vm.passStrength = "Medium";
      }else if(stroPattern.test(pass)){
        vm.passStrength = "Strong";
      }else{
        vm.passStrength = "Invalid Characters entered";
      }

    }

  }

})();
