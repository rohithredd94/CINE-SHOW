(function () {

  angular.module('meanApp', ['ngRoute']);

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
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    console.log('Inside Run Function');
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      //This code is not helping to prevent illegal login
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        console.log('Checking if logged in-1');
        $location.path('/');
      }else if(($location.path() === '/'/* || $location.path() === '/register'*/) && authentication.isLoggedIn()){ //Change by Rohith
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
