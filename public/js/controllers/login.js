angular
  .module('GuessWhart')
  .controller('LoginController', LoginController);

LoginController.$inject = ['User'];
function LoginController(User) {

  this.credentials = {};

  this.submit = function() {
    User.login(this.credentials, function(res) {
      console.log(res);
    })
  }
}
