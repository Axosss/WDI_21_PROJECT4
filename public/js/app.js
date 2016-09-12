angular
  .module('GuessWhart', ['ui.router', 'ngResource', 'angular-jwt', 'satellizer'])
  .constant("API_URL", "http://localhost:3000/api")
  .config(oAuthConfig)
  .config(Router);

//oAuth
oAuthConfig.$inject = ["$authProvider", "API_URL"];
function oAuthConfig($authProvider, API_URL) {
  $authProvider.facebook({
    url: API_URL + '/oauth/facebook',
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
      templateUrl: "/templates/game.html",
      controller: ""
    });

  $urlRouterProvider.otherwise("/");
}


