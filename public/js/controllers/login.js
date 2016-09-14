angular
  .module('GuessWhart')
  .controller('LoginController', LoginController);

LoginController.$inject = ['User', "$state", "$rootScope", "$auth"];
function LoginController(User, $state, $rootScope, $auth) {

  this.credentials = {};

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
     $rootScope.$broadcast("loggedIn");
    });
  }

//oAuth
  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        self.currentUser = $auth.getPayload();
        $rootScope.$broadcast("loggedIn");
      });
  }

}
