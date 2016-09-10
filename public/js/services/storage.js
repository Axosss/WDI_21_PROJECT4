angular
  .module('GuessWhart')
  .service('storage', storage);

//Because local storage is on the window, we inject the window
storage.$inject = ['$window'];
function storage($window){
  this.storeData = function(key, data) {
    $window.localStorage.setItem(key, JSON.stringify(data));
  }

  this.getData = function(key) {
    return JSON.parse($window.localStorage.getItem(key));
  }
}