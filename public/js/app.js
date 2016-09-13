angular
  .module('GuessWhart', ['ui.router', 'ngResource', 'angular-jwt', 'satellizer'])
  .constant("BROOKLYN_API", "https://www.brooklynmuseum.org/api/v2/")
  .config(oAuthConfig)
  .config(Router);

//oAuth
oAuthConfig.$inject = ["$authProvider", "BROOKLYN_API"];
function oAuthConfig($authProvider, BROOKLYN_API) {
  $authProvider.httpInterceptor = function(config) {
    return !config.url.match(BROOKLYN_API);
  }
  
  $authProvider.facebook({
    url: '/api/oauth/facebook',
    clientId: "1090368224378228"
  })
}  

//templates
Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state("users", {
      url: "/users",
      templateUrl: "/templates/users.html",
      controller: "UsersController as users"
    })
    .state("game", {
      url: "/game",
      templateUrl: "/templates/game.html"
    })
    .state("playing", {
      url: "/playing",
      templateUrl: "/templates/playing.html"
    });

  $urlRouterProvider.otherwise("/");
}


