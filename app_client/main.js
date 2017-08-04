(function () {

  angular.module('meanApp', ['ngRoute','ng-sweet-alert']);


  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/main', {
        templateUrl: '/main/main.view.html',
        controller: 'mainCtrl',
        controllerAs: 'vm'
      })
      .when('/search', {
        templateUrl: '/search/searchpage.view.html',
        controller: 'searchPageCtrl',
         controllerAs: 'vm'
      })
      .when('/movies/:id', {
        templateUrl: '/movieProfile/movieProfile.view.html',
        controller: 'movieCtrl',
        controllerAs: 'vm'
      })
      .when('/favorites/:user_id', {
        templateUrl: '/favorite/favorite.view.html',
        controller: 'favCtrl',
        controllerAs: 'vm'
      })
      .when('/popular', {
        templateUrl: '/popular/popular.view.html',
        controller: 'popularCtrl',
        controllerAs: 'vm'
      })
      .when('/comingsoon', {
        templateUrl: '/comingsoon/comingsoon.view.html',
        controller: 'csCtrl',
        controllerAs: 'vm'
      })
      .when('/latest', {
        templateUrl: '/latest/latest.view.html',
        controller: 'latestCtrl',
        controllerAs: 'vm'
      })
      .when('/toprated', {
        templateUrl: '/toprated/toprated.view.html',
        controller: 'topratedCtrl',
        controllerAs: 'vm'
      })
      .when('/genres/:id', {
        templateUrl: '/genres/genres.view.html',
        controller: 'genresCtrl',
        controllerAs: 'vm'
      })
      .when('/movies/cast/:id', {
        templateUrl: '/cast/cast.view.html',
        controller: 'castCtrl',
        controllerAs: 'vm'
      })
      .when('/allmovies', {
        templateUrl: '/allmovies/allmovies.view.html',
        controller: 'allMoviesCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    console.log('Inside Run Function');
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      //This code is not helping to prevent illegal login
      if (!($location.path() === '/' || $location.path() === '/register' || $location.path() === '/login') && !authentication.isLoggedIn()) {
        console.log('Checking if logged in-1');
        $location.path('/');
      }else if(($location.path() === '/' || $location.path() === '/register' || $location.path() === '/login') && authentication.isLoggedIn()){ //Change by Rohith
        console.log('Checking if logged in-2');
        $location.path('/main');
      }


    });
  }

  angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
