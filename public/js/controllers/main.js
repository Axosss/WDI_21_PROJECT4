angular
  .module('GuessWhart')
  .controller('MainController', MainController);

MainController.$inject = ["musuem", "$rootScope", "$state", "$auth", "$timeout", "$interval", "User"];
function MainController(musuem, $rootScope, $state, $auth, $timeout, $interval, User) {
  var self = this;

  this.collections = [];
  this.collection = [];
  this.selectedCollection = null;
  this.level;
  this.levelToggle;
  this.currentUser = $auth.getPayload();
// var userData = $auth.getPayload();

// User.get({ id: userData._id }, function(user) {
//   self.currenUser = user;
// });

  this.errorMessage = null;
  this.score = 0;
  this.shuffledArtists;
  this.roundComplete;
  // this.time = 5;

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

  this.selectCollection = function() {
    musuem.getCollection(this.selectedCollection)
      .then(function(dataThatWeWant){
        $rootScope.$applyAsync(function() {
          self.collection = dataThatWeWant;
          
          if(self.level === "level1") {
            self.levelToggle = true;
          }
          if(self.level === "level2") {
            self.levelToggle = false;
          }
          self.play();

        });
      });
  }

  this.play = function() {
    self.gameEnd = false;
    self.roundComplete = false;
    // self.beginTimer = $interval(self.timerFunction, 1000);
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
 // Other level : Who is the painter //
 //////////////////////////////////////
 

    var randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.winner = self.collection.splice(randomIdx, 1)[0];
    randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.loser1 = self.collection[randomIdx];
    randomIdx2 = Math.floor(Math.random() * (self.collection.length-1));
    self.loser2 = self.collection[randomIdx2];
    randomIdx3 = Math.floor(Math.random() * (self.collection.length-1));
    self.loser3 = self.collection[randomIdx3];

    while(randomIdx === randomIdx2) {
      randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    }
    while(randomIdx2 === randomIdx3) {
      randomIdx2 = Math.floor(Math.random() * (self.collection.length-1));
    }
    while(randomIdx === randomIdx3) {
      randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    }

    var theArtistsArr = [self.winner.artist, self.loser1.artist, self.loser2.artist, self.loser3.artist];
    randomArtistPosition = Math.floor(Math.random() * (theArtistsArr.length-1));

// console.log("Here are the artists ", theArtistsArr);

    shuffleArtists(theArtistsArr);

    function shuffleArtists(artistsArray) {
      self.shuffledArtists = artistsArray.sort(function() {
        return .5 - Math.random();
      });
// console.log("Here is the shuffled array of artists ", self.shuffledArtists);
    }
  }

//Tcheck winner or loser for find the artist

self.loosingLogic = 0;

  this.checkArtist = function(artist) { 
    if(!self.roundComplete) {
      if(artist === self.winner.artist){
        console.log("WINNER CHICKEN DINNER")
        self.score += 50;
        self.currentUser.score += 50;
        self.roundComplete = true;
// self.currentUser.$update();
// win.class = "green"
// artist.class = "greenArtistWin";
        $timeout(function() {
        self.play();
        }, 500);
      } else {
        console.log("lost");  
        self.loosingLogic--;
        self.score-= 15;
        self.currentUser.score -= 15;
// artist.class = "redArtistLose";
        if(self.loosingLogic == -2) {
          $timeout(function() {
          self.play();
          }, 500);
          self.loosingLogic = 0;
          self.roundComplete = true;
        }
      }
    }
  console.log(self.loosingLogic)
  }

//Tcheck Winner or loser for : Pick the right image
  this.checkImage = function(image) {
    if(!self.roundComplete) {
      if(image === this.winner) {
        image.class = "green";
        this.score += 50;
        self.currentUser.score += 50;
        self.roundComplete = true;
      } else {
        self.score -= 15;
        self.currentUser.score -= 15;
        image.class = "red";
        self.roundComplete = true;
      }

      $timeout(function() {
        image.class = "";
        self.play();
      }, 500);
    }
  }

//Timer
  self.timerFunction = function() {
      self.time = self.time - 1;
console.log(self.time);
      if(self.time === 0) {
              // end games
          self.time = 0;
          self.gameEnd = true;
          $interval.cancel(self.beginTimer);
          return
      }
  }
}
