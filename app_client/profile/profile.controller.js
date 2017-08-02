(function() {

  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData','authentication'];
  function profileCtrl($location, meanData, authentication) {
    var vm = this;

    vm.user = {};

    vm.newdata = {
      _id:"",
      name:"",
      email:"",
      password:"",
      bio:""
    }
    vm.isAdmin = false;
    vm.onUpdateMsg = "";
    vm.newmovie = {
      title: "",
      overview: "",
      genre_ids: [],
      image: "",
      release_date: ""
    };
    vm.newgenres = [
      {
          "id" : 28,
          "name" : "Action"
      },
      {
          "id" : 16,
          "name" : "Animation"
      },
      {
          "id" : 12,
          "name" : "Adventure"
      },
      {
          "id" : 35,
          "name" : "Comedy"
      },
      {
          "id" : 80,
          "name" : "Crime"
      },
      {
          "id" : 99,
          "name" : "Documentary"
      },
      {
          "id" : 18,
          "name" : "Drama"
      },
      {
          "id" : 10751,
          "name" : "Family"
      },
      {
          "id" : 14,
          "name" : "Fantasy"
      },
      {
          "id" : 36,
          "name" : "History"
      },
      {
          "id" : 10752,
          "name" : "War"
      },
      {
          "id" : 37,
          "name" : "Western"
      },
      {
          "id" : 10402,
          "name" : "Music"
      },
      {
          "id" : 9648,
          "name" : "Mystery"
      },
      {
          "id" : 53,
          "name" : "Thriller"
      },
      {
          "id" : 10749,
          "name" : "Romance"
      },
      {
          "id" : 27,
          "name" : "Horror"
      },
      {
          "id" : 10770,
          "name" : "TV Movie"
      },
      {
          "id" : 878,
          "name" : "Science Fiction"
      }];
    vm.selection = [];
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
    };

    vm.toggleSelection = function(genreid){
      var idx = vm.selection.indexOf(genreid);
      if(idx > -1){
        vm.selection.splice(idx,1);
      }else{
        vm.selection.push(genreid);
      }
      //console.log(vm.selection);
    };

    vm.addMovie = function(){
      vm.onUpdateMsg = "";
      if(vm.newdate.release_date != null){
        var date = vm.newdate.release_date.getDate();
        if(date.toString().length != 2){
          date = '0'+date;
        }
        var month = vm.newdate.release_date.getUTCMonth()+1;
        if(month.toString().length != 2){
          month = '0'+month;
        }
        var year = vm.newdate.release_date.getFullYear();
        vm.newmovie.release_date = year+'-'+month+'-'+date;
      }
        if(vm.selection.length != 0)
          vm.newmovie.genre_ids = vm.selection;
      console.log(vm.newmovie);
      // movieData.updateMovie(vm.movie).success(function(info){
      //   console.log('success');
      //   vm.onUpdateMsg = "Movie Updated Successfully";
      // });

    };
  }


})();
