(function() {

  angular
    .module('meanApp')
    .controller('movieCtrl', movieCtrl);

  movieCtrl.$inject = ['$location', 'meanData','review', 'favorite', 'movieData','authentication','$route'];
  function movieCtrl($location, meanData, review, favorite, movieData, authentication,$route) {
    var vm = this;
    vm.user = {};
    vm.movie = {};
    vm.movieRatinPercentage = "";
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
    vm.newdate = "";
    vm.isAdmin = false;

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
    console.log("Inside Main Controller");
    vm.onClick = function(){
      console.log("Logging Out");
      authentication.logout();
      $location.path("/");
    };
    vm.onClickProfile = function(){
      $location.path("/profile");
    };

     vm.onFavorite = function () {
      console.log('Submitting review');
      vm.favorite.user_id = vm.user.email;
      vm.favorite.movie_id = vm.movie.id;
      console.log(vm.favorite);
      favorite
        .postFavorite(vm.favorite)
        .success(function(){
          console.log("Inside success");
          $location.path('/movies/'+vm.movie.id);
          $route.reload()
        })
        .error(function(err){
          console.log(err.message);
          if(err.message = "Already added to favorites")
            vm.favorite.message = "Already added to favorites";
        });
      //alert("clicked!!");
    };

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
          $location.path('/movies/'+vm.movie.id);
          $route.reload()
        })
        .error(function(err){
          console.log(err.message);
          // if(err.message = "User Already exists")
          //   vm.credentials.message = "User Already Exists";
        });
    };

    vm.updateMovie = function(){
      console.log(vm.newdate);
      vm.onUpdateMsg = "";
      if(vm.newdate != null){
        var date = vm.newdate.getDate();
        if(date.toString().length != 2){
          date = '0'+date;
        }
        var month = vm.newdate.getUTCMonth()+1;
        if(month.toString().length != 2){
          month = '0'+month;
        }
        var year = vm.newdate.getFullYear();
        vm.movie.release_date = year+'-'+month+'-'+date;
      }else{
        vm.movie.release_date = vm.date;
      }
      console.log(vm.selection.length);
        if(vm.selection.length != 0)
          vm.movie.genre_ids = vm.selection;
      console.log(vm.movie);
      movieData.updateMovie(vm.movie).success(function(info){
        console.log('success');
        vm.onUpdateMsg = "Movie Updated Successfully";
      });

    };

    vm.toggleSelection = function(genreid){
      var idx = vm.selection.indexOf(genreid);
      if(idx > -1){
        vm.selection.splice(idx,1);
      }else{
        vm.selection.push(genreid);
      }
      console.log(typeof(vm.selection));
    };

    vm.deleteMovie = function(){
      console.log('Delete Movie', vm.movie.id);
      movieData.deleteMovie(vm.movie.id)
      .success(function(info){
        //$location.path('/main');
        $location.path('/movies/'+vm.movie.id);
        $route.reload()
      });
    }

    vm.showMovie = function(){
      console.log('Show Movie', vm.movie.id);
      movieData.showMovie(vm.movie.id)
      .success(function(info){
        $location.path('/movies/'+vm.movie.id);
        $route.reload()
      });
    }

    movieData.getMovieProfile()
      .success(function(data) {
        vm.movie = data;
        vm.date = vm.movie.release_date;
        //vm.movie.release_date = vm.movie.release_date.replace('-','/').replace('-','/');
        //vm.movie.release_date = '01/01/2000';

        console.log(vm.movie);
        vm.movieRatinPercentage = data['vote_average']* 10;
      })
      .error(function (e) {
        console.log(e);
      });
  }

  angular
    .module('meanApp')
    .directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
})
();
