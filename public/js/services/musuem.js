angular
  .module('GuessWhart')
  .service('musuem', musuem);

musuem.$inject = ["$http", "$window", "storage", "BROOKLYN_API"];
function musuem($http, $window, storage, BROOKLYN_API) {

  this.getCollections = function() {

    var dataThatWeWant = storage.getData('collections');
    if(dataThatWeWant) {
      return new $window.Promise(function(resolve) {
        resolve(dataThatWeWant);
      });
    }

    return $http.get(BROOKLYN_API + "collection", {
      headers: { api_key: 'XuDPLIobCjN48cQ0V7ZrZ6wKPcqeDKUU' }
    })
    .then(function(res) {
      var dataThatWeWant = res.data.data.map(function(collection) {
        return { name: collection.name, id:  collection.id };
      });

      storage.storeData('collections', dataThatWeWant);
      
      return dataThatWeWant;
    });
  }

  this.getCollection = function(id) {
    var dataThatWeWant = storage.getData('collections'+id);
    if(dataThatWeWant) {
      return new $window.Promise(function(resolve) {
        resolve(dataThatWeWant);
      });
    }
    return $http.get(BROOKLYN_API + "collection/"+id, {
      headers: { api_key: 'XuDPLIobCjN48cQ0V7ZrZ6wKPcqeDKUU' }
    })
    .then(function(res) {
      var arrayOfPromises = res.data.data.highlight_images.map(function(image) {
        return $http.get(BROOKLYN_API + "object/" + image.id, {
          headers: { api_key: 'XuDPLIobCjN48cQ0V7ZrZ6wKPcqeDKUU' }  
        });
      });

      return $window.Promise.all(arrayOfPromises)
        .then(function(res) {
          var dataThatWeWant = res.map(function(response) {

            var artistsName = response.data.data.artists.map(function(artist) {
              return artist.name;
            }).join(", ");

            return {
              id: response.data.data.id,
              imageUrl: "http://" + response.data.data.images[0].standard_size_url,
              artist: artistsName
            }
          });

          storage.storeData('collections'+id, dataThatWeWant);
          return dataThatWeWant;
        });

    })
    .catch(function(err) {
      console.log(err);
    });
  }
}