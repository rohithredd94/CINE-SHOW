(function() {

  angular
    .module('meanApp')
    .service('review', review);

  review.$inject = ['$http', 'authentication'];
  function review($http, authentication) {

    var postMovieReview = function (reviewData) {
      return $http.post('/api/movies/review', reviewData).success(function(data){
        saveToken(data.token);
      });
    };

    var getMovieReview = function (){
      console.log('Inside get movie review service');
      return $http.get('/api/profile/review', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }
    return {
      postMovieReview : postMovieReview,
      getMovieReview : getMovieReview
    };
  }

})();
