angular
  .module('GuessWhart')
  .controller('MainController', MainController);

MainController.$inject = ["musuem", "$rootScope", "TokenService", "$state", "$auth"];
function MainController(musuem, $rootScope, TokenService, $state, $auth) {
  var self = this;

  this.collections = [];
  this.selectedCollection = null;

  this.currentUser = $auth.getPayload();
  this.errorMessage = null;

// Token 
 this.logout = function logout() {
   $auth.logout();
   this.currentUser = null;
   $state.go("home");
 }

//RootScope to let main when someone is loggedIn 
  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
    console.log("lets get the token", self.currentUser);
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "You must be logged in!";
  });

  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });

// Brooklyn API
  // musuem.getCollections()
  //   .then(function(dataThatWeWant) {
  //     $rootScope.$applyAsync(function() {
  //       self.collections = dataThatWeWant;
  //     });
  //   });

  // this.play = function() {
  //   musuem.getCollection(this.selectedCollection)
  //     .then(function(dataThatWeWant){
  //       console.log(dataThatWeWant);
  //       this.images = dataThatWeWant;
  //     });
  // }

  // this.images = [];
}