angular
  .module('GuessWhart')
  .controller('MainController', MainController);

MainController.$inject = ["musuem", "$rootScope", "$state", "$auth", "$timeout"];
function MainController(musuem, $rootScope, $state, $auth, $timeout) {
  var self = this;

  this.collections = [];
  this.collection = [];
  this.selectedCollection = null;
  this.currentUser = $auth.getPayload();
  this.errorMessage = null;
  self.score = 0;

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
          self.play();
        });
      });
  }

  this.play = function() {
    self.gameEnd = false;
    // self.timer();
    if(self.collection.length < 2) {
      self.gameEnd = true;
      // save to leaderboard => need a special stuff in the user model
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
    //SPLICE the correct image from the array
    self.winner = self.collection.splice(randomIdx, 1)[0];
    randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.loser1 = self.collection[randomIdx];
    self.loser2 = self.collection[randomIdx];
    self.loser3 = self.collection[randomIdx];
  }

  this.check = function(image) {
    if(image === this.winner) {
      image.class = "green";
      this.score += 1;
    } else {
      image.class = "red";
    }

    $timeout(function() {
      image.class = "";
      self.play();
    }, 500);
  }

// #Timer
  self.timer = function(){
    self.time = 5;
    self.timer = setInterval(function() {
      self.time--;
// console.log(self.time)
      if(self.time === 0) {
        // end games
        // console.log(self.time)
        self.time = 0;
        self.gameEnd=true;
      }
    }, 1000);
  } 
}


/// Test function to disable click event 
//   self.flag = 0;
//   self.disableClick = function(n) {
//      if (n && n !== self.flag) {
//          self.flag = n;
//          alert("Clicked!");
//      }
//      return false;
//   }





