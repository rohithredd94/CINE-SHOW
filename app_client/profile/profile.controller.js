(function() {

  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData','authentication','review'];
  function profileCtrl($location, meanData, authentication,review) {
    var vm = this;

    vm.user = {};
    vm.userReviews = {};
    vm.newdata = {
      _id:"",
      name:"",
      email:"",
      password:"",
      bio:""
    }

    vm.onUpdateMsg = "";
    meanData.getProfile()
      .success(function(data) {
        console.log("Test Here 2");
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
      review.getMovieReview()
        .success(function(data){
          console.log("data from movie review-->",data);
          vm.userReviews = data;
        })
        .error(function (e) {
          console.log(e);
        });
    console.log("Profile controller");
    vm.onClick = function(){
      console.log("Logging Out");
      authentication.logout();
      $location.path("/");
    }
    vm.clearMessage = function(){
      vm.onUpdateMsg = "";
    }
    vm.updateUser = function(){
      vm.newdata._id = vm.user._id;
      vm.newdata.name = vm.user.name;
      vm.newdata.email = vm.user.email;
      vm.newdata.password = vm.user.password;
      vm.newdata.bio = vm.user.bio;
      meanData.storeUpdateUser(vm.newdata)
        .success(function(data){
          console.log("inside",data);
          vm.onUpdateMsg = data;
          //$location.path("/main");
        })
        .error(function (e){
          console.log(e);
        })
    }


  }


})();
