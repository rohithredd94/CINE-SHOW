(function() {

  angular
    .module('meanApp')
    .controller('castCtrl', castCtrl);

  castCtrl.$inject = ['$location', 'meanData','cast','authentication','$route'];
  function castCtrl($location, meanData, cast, authentication,$route) {
    var vm = this;
    vm.user = {};
    vm.moviecast = {};

      meanData.getProfile()
    .success(function(data) {
      vm.user = data;
      if(vm.user.email == 'admin@cineshow.com'){
        vm.isAdmin = true;
      }
    })
    .error(function (e) {
      console.log(e);
    });

    cast.getCast()
      .success(function(data) {
        console.log("Data received from server-->",data);
        vm.moviecast = data;
        console.log(vm.moviecast);
      })
      .error(function (e) {
        console.log(e);
      });
    
}
})
();
