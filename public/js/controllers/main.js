angular
  .module('GuessWhart')
  .controller('MainController', MainController);

MainController.$inject = ["musuem", "$rootScope"];
function MainController(musuem, $rootScope) {
  var self = this;

  this.collections = [];
  this.selectedCollection = null;

  musuem.getCollections()
    .then(function(dataThatWeWant) {
      $rootScope.$applyAsync(function() {
        self.collections = dataThatWeWant;
      });
    });

  this.play = function() {
    musuem.getCollection(this.selectedCollection)
      .then(function(dataThatWeWant){
        console.log(dataThatWeWant);
        this.images = dataThatWeWant;
      });
  }

  this.images = [];
}