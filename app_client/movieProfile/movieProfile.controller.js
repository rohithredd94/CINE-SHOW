(function() {

  angular
    .module('meanApp')
    .controller('movieCtrl', movieCtrl);

  movieCtrl.$inject = ['$location', 'meanData','review', 'favorite', 'movieData','authentication'];
  function movieCtrl($location, meanData, review, favorite, movieData, authentication) {
    var vm = this;
    vm.user = {};
    vm.movie = {};
   console.log("Initialized credentials for review");
    vm.review = {
      email : "",
      name : "",
      id :"",
      review : "",
      rating:""
    };
    vm.favorite= {
      user_id : "",
      movie_id : "",
      message : ""
    };
    meanData.getProfile()
      .success(function(data) {
        console.log("inside get popular-2",data);
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
    console.log("Inside Main Controller");
    vm.onClick = function(){
      console.log("Logging Out");
      authentication.logout();
      $location.path("/");
    }
    vm.onClickProfile = function(){
      // console.log("Logging Out");
      // authentication.logout();
      $location.path("/profile");
    }

     vm.onFavorite = function () {
      console.log('Submitting review');
      vm.favorite.user_id = vm.user.email;
      vm.favorite.movie_id = vm.movie.id;
      console.log(vm.favorite);
      favorite
        .postFavorite(vm.favorite)
        .success(function(){
          console.log("Inside success");
          $location.path("/main");
        })
        .error(function(err){
          console.log(err.message);
          if(err.message = "Already added to favorites")
            vm.favorite.message = "Already added to favorites";
        });
      //alert("clicked!!");
    }

     vm.onSubmit = function () {
      console.log('Submitting review');
      //console.log(vm.user);
      vm.review.email = vm.user.email;
      vm.review.name = vm.user.name;
      vm.review.id = vm.movie.id;
      console.log(vm.review);
      review
        .postMovieReview(vm.review)
        .success(function(){
          console.log("Inside success");
          //console.log("Data",vm.movie.id);
          //console.log("/movies/"+vm.movie.id);
          $location.path("/main");
        })
        .error(function(err){
          console.log(err.message);
          // if(err.message = "User Already exists")
          //   vm.credentials.message = "User Already Exists";
        });
      //alert("clicked!!");
    }

    movieData.getMovieProfile()
      .success(function(data) {
        console.log("inside get popular",data);
        vm.movie = data;
      })
      .error(function (e) {
        console.log(e);
      });
  }
})
();
