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

// Token 
 this.logout = function logout() {
   $auth.logout();
   this.currentUser = null;
   $state.go("home");
 }

//RootScope to let main know when someone is loggedIn 
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

    if(self.collection.length < 2) {
      console.log("can't play anymore!");
      return;
    }

    var randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.winner = self.collection.splice(randomIdx, 1)[0];

    randomIdx = Math.floor(Math.random() * (self.collection.length-1));
    self.loser = self.collection[randomIdx];
    
//SPLICE the correct image from the array
    
//ALTERNATE POSITION SO ITS NOT ALWAYS THE IMAGE ON THE LEFT
    self.position = !!(Math.round(Math.random()));

    self.a = self.position ? self.winner : self.loser;
    self.b = self.position ? self.loser : self.winner;
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
    }, 1000);
  }

//   self.nextImages = function(dataThatWeWant) {
//     $rootScope.$applyAsync(function() {
//       self.collection = dataThatWeWant;

//       var randomIdx1 = Math.floor(Math.random() * (self.collection.length-1));
//       var randomIdx2 = Math.floor(Math.random() * (self.collection.length-1));
//       while(randomIdx2 === randomIdx1) {
//         randomIdx2 = Math.floor(Math.random() * (self.collection.length-1));
//       }
      
//       console.log("ran 1 " + randomIdx1)
//       console.log("rand 2 " + randomIdx2)
      
// //SPLICE the correct image from the array
//       self.collection.splice([randomIdx1], 1);
// //ALTERNATE POSITION SO ITS NOT ALWAYS THE IMAGE ON THE LEFT
//       self.position = !!(Math.round(Math.random()));

//       self.selected = self.collection[randomIdx1];
//       self.other = self.collection[randomIdx2]
//     });
//   }

  self.score = 0;

}

  // this.timer = function(){
  //   var time = 60
  //   timer = setInterval(function() {
  //     time--;
  //     // if(time===0){
  //     //   end games
  //     // }
  //   });
  // }




// Steps : 
// #Display one painting 
// <img src="www.whatever.com/jkfwkjfewbjnke">
// #Display one painting from the selected collection 
//    X DONE 
// #Random function that select 2 paintings from the collection
//    X DONE 
// #Show stuff
//   #Show name of the painter we want the user to find: 
//    X DONE 

// #Game logic : 
//   If the painting clicked is the same ==> border green and title green, next level, + points,   timer = 0, picture fade
  
//   If not : border red. next level
  
//   Ends when : No time or No more paintings 

//   No more paintings : Array of number that is the lenght of the number of object in the collection 

// #Timer


// #Points
