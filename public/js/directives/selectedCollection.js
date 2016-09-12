angular
  .module('GuessWhart')
  .directive('hello', selectedCo)

function selectedCo() {
  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl: "_selectedCollection.html",
    scope: {
      texte: '='
    }
  };

  return directive;
}
