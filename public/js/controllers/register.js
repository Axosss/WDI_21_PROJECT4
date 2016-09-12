angular
  .module("GuessWhart")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ['User', "$state", "$rootScope", "$auth"];
function RegisterController(User, $state, $rootScope, $auth) {
  this.user = {};

  this.submit = function() {
    $auth.signup(this.user, {
      url: "/api/register"
    }).then(function(){
     $rootScope.$broadcast("loggedIn");
     $state.go("home");
    })
  }
}