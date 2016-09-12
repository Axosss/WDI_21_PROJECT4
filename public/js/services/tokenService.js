angular
  .module('GuessWhart')
  .service('TokenService', TokenService);

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper) {
  
  this.setToken = function setToken(token) {
    return $window.localStorage.setItem('token', token);
  }

  this.getToken = function getToken() {
    return $window.localStorage.getItem('token');
  }

  this.clearToken = function clearToken() {
    return $window.localStorage.removeItem('token');
  }

  this.decodeToken = function decodeToken() {
    var token = this.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  }

}