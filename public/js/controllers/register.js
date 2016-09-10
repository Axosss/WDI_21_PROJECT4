angular
  .module("GuessWhart")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = [];
function RegisterController() {

  this.user = {};

  this.submit = function() {
    User.register(this.user, function(res) {
      console.log(res);
    });
  }
}