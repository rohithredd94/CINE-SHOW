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
    return {
      postMovieReview : postMovieReview
    };
  }

})();
