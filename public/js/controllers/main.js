angular
  .module('GuessWhart')
  .controller('MainController', MainController);

MainController.$inject = ["musuem", "$rootScope", "$state", "$auth"];
function MainController(musuem, $rootScope,$state, $auth) {
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

  this.play = function() {
    musuem.getCollection(this.selectedCollection)
      .then(function(dataThatWeWant){
        $rootScope.$applyAsync(function() {
          self.collection = dataThatWeWant;

          var randomIdx1 = Math.floor(Math.random() * self.collection.length-1);
          var randomIdx2 = Math.floor(Math.random() * self.collection.length-1);
          while(randomIdx2 === randomIdx1) {
            randomIdx2 = Math.floor(Math.random() * self.collection.length);
          }
          
          console.log("ran 1 " + randomIdx1)
          console.log("rand 2 " + randomIdx2)
          console.log("before splice " + self.collection.length)
          self.collection.splice([randomIdx1], 1);
          self.collection.splice([randomIdx2], 1);
          console.log("after splice " + self.collection.length)

          self.position = !!(Math.round(Math.random()));

          self.selected = self.collection[randomIdx1];
          self.other = self.collection[randomIdx2]
          console.log(self.collection)
          console.log(self.selected)
          console.log(self.other)
        });
      });
  }
// console.log(self.selected.artist)

  self.score = 0;

  self.win = function() {
    console.log('win');
    self.score++ ; 
  }

  // this.removeImages = function() {
  //   var removed = collection.splice(randomIdx1, 1);
  // }

    

///////////////////////////////////////////////////////////////////
 

  // this.timer = function(){
  //   var time = 60
  //   timer = setInterval(function() {
  //     time--;
  //     // if(time===0){
  //     //   end games
  //     // }
  //   });
  // }
}



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
