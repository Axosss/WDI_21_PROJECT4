angular
  .module('GuessWhart')
  .controller('MainController', MainController);

MainController.$inject = ["musuem", "$rootScope", "$state", "$auth", "$timeout", "$interval", "User"];
function MainController(musuem, $rootScope, $state, $auth, $timeout, $interval, User) {
  var self = this;

  this.collections = [];
  this.collection = [];
  this.selectedCollection = "";
  this.level;
  this.levelToggle;
  this.playingToggle;
  this.currentUser = $auth.getPayload();
// var userData = $auth.getPayload();

// User.get({ id: userData._id }, function(user) {
//   self.currenUser = user;
// });
  this.errorMessage = null;
  this.score = 0;
  this.shuffledArtists;
  this.roundComplete;
  this.time;


  // Token 
  this.logout = function logout() {
    $auth.logout();
    this.currentUser = null;
    $state.go("home");
  }

  //RootScope to let main know when someone is loggedIn 
  $rootScope.$on("loggedIn", function() {
    $state.go("home");
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
  musuem.getCollections()
    .then(function(dataThatWeWant) {
      $rootScope.$applyAsync(function() {
        self.collections = dataThatWeWant;
      });
    });

  this.collectionChanged = function () {
    console.log('collection changed: selectedCollection:', self.selectedCollection);
    console.log('collection changed: self.collections:', self.collections);
  };


  this.selectCollection = function() {
    musuem.getCollection(this.selectedCollection)
      .then(function(dataThatWeWant){
        $rootScope.$applyAsync(function() {
          self.collection = dataThatWeWant;
          self.time = 90;
          self.score= 0;
          if(self.level === "level1") {
            self.levelToggle = true;
            self.level1();
          }
          if(self.level === "level2") {
            self.levelToggle = false;
            self.level2();
          }
          self.playingToggle = true;
        });
      });
  }

  //////////////////////////////////////
  // Level 1 : Who is the Artist     //
  //////////////////////////////////////
  this.level1 = function() {
    self.gameEnd = false;
    self.roundComplete = false;
    $interval.cancel(self.beginTimer);
    self.beginTimer = $interval(self.timerFunction, 1000);
    if(self.collection.length < 2) {
      self.gameEnd = true;
      return;
    }

    var randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    //SPLICE the correct image from the array
    self.winner = self.collection.splice(randomIdx, 1)[0];
    randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.loser = self.collection[randomIdx];
    //ALTERNATE IMAGE POSITION 
    self.position = !!(Math.round(Math.random())); // 1 or 0 so !! => true or false

    self.a = self.position ? self.winner : self.loser;
    self.b = self.position ? self.loser : self.winner;
 

 //////////////////////////////////////
 // Level 2 : Who is the painter     //
 //////////////////////////////////////
 }
 this.level2 = function() {
    self.gameEnd = false;
    self.roundComplete = false;
    $interval.cancel(self.beginTimer);
    self.beginTimer = $interval(self.timerFunction, 1000);
    if(self.collection.length < 4) {
      self.gameEnd = true;
      return;
    }

    var randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.winner = self.collection.splice(randomIdx, 1)[0];

    var artists = self.collection.map(function(piece){
      return piece.artist;
    });

    var uniqueArtists = [];

    artists.forEach(function(artist) {
      if(uniqueArtists.indexOf(artist) === -1 && uniqueArtists.indexOf(self.winner.name) === -1) {
        uniqueArtists.push(artist);
      }
    });

    theArtistsArr = uniqueArtists.slice(0,3);
    theArtistsArr.push(self.winner.artist);

    self.shuffledArtists = shuffle(theArtistsArr);

    function shuffle(arr) {
      return arr.sort(function() {
        return .5 - Math.random();
      });
// console.log("Here is the shuffled array of artists ", self.shuffledArtists);
    }
  }

//Tcheck winner or loser for find the artist
// self.loosingLogic = 0;

  this.checkArtist = function(artist) { 
    if(!self.roundComplete) {
      if(artist === self.winner.artist){
        self.score += 50;
        self.roundComplete = true;
// artist.class = "greenArtistWin";
      } else if(artist !== self.winner.artist) {
        console.log("lost");  
        self.score-= 15;
        self.currentUser.score -= 15;
      }
      $timeout(function() {
        self.level2();
      }, 500);
    }
 
  }

//Tcheck Winner or loser for : Pick the right image
  this.checkImage = function(image) {
    if(!self.roundComplete) {
      if(image === this.winner) {
        image.class = "green";
        this.score += 50;
        self.currentUser.score += 50;
        self.roundComplete = true;
      } else if(image !== this.winner) {
        self.score -= 15;
        self.currentUser.score -= 15;
        image.class = "red";
        self.roundComplete = true;
      }
      $timeout(function() {
        image.class = "";
        self.level1();
      }, 500);
    }
  }

//Timer
  self.timerFunction = function() {
    self.time--;
    if(self.time <= 0) {
      self.gameEnd = true;
      console.log(self.gameEnd)
      $interval.cancel(self.beginTimer);
    }
  }

}


