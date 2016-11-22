//<reference path="./bower_components/angular/angular.min.js" />
 //<reference path="./app.js" />

app.service('orderService',function($http)
{
  // Create a New Record
  this.post = function(Order){
      
      var request = $http({
          method:'post',
          url:'http://localhost:3300/order_detail',
          data:Order 
      });
      return request;
  }  
  
   //Get All Record
    this.getOrders = function () {
        return $http.get("http://localhost:3300/order_detail"); 
    }
    
   //Update the Record
    this.put = function (orderid,Order) {
        var request = $http({
            method: "put",
            url: "http://localhost:3300/order_detail/" + orderid,
            data: Order
        });
        return request;
    }
        
    //Delete the Record
    this.delete = function (orderid) {
        var request = $http({
            method: "delete",
            url: "http://localhost:3300/order_detail/" + orderid
        });
        return request;
    }
});