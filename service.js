//<reference path="./bower_components/angular/angular.min.js" />
 //<reference path="./app.js" />

app.service('crudService',function($http)
{
  // Create a New Record
  this.post = function(Client){
      
      var request = $http({
          method:'post',
          url:'http://localhost:3300/client_order',
          data:Client 
      });
      return request;
  }  
    
     //Get All Books
    this.getClients = function () {
        return $http.get("http://localhost:3300/client_order"); 
    }
     
     //Delete the Record
    this.delete = function (clientid) {
        var request = $http({
            method: "delete",
            url: "http://localhost:3300/client_order/" + clientid
        });
        return request;
    }
});