/// <reference path="./bower_components/angular/angular.min.js" />
/// <reference path="./app.js" />

//The controller is having 'orderService' dependency.
//This controller makes call to methods from the service 
app.controller('orderController', function ($scope, orderService) {
    
    $scope.IsNewRecord = 0; //1 for the flag for the new record
 
    loadRecords(); 
 
   //Function to load all records
    function loadRecords() 
    {
         var promiseGet = orderService.getOrders(); //Method Call from the service
         promiseGet.then(function (pl)
          { 
              $scope.Order = pl.data.rows;
          },
         function (errorPl) 
         {
             $log.error('failure loading Order', errorPl);
         });
    }
     
    //  The Save scope method use to define the Order object.
    //  In this method if IsNewRecord is zero then Update order else 
    // Create the client information to the server
    $scope.save = function (){
        var Order= {
                    orderid: $scope.orderid,
                    purchase_order_no: $scope.purchase_order_no,
                    po_date: $scope. po_date,
                    last_date:$scope.last_date,
                    service:$scope.service,
                    numberofunits:$scope.numberofunits,
                    priceperunit:$scope.priceperunit
                    
                  };
                   //    If the flag is 1 the it is new record
                    if ($scope.IsNewRecord === 1)
                     {
                        var promisePost = orderService.post(Order);
                        promisePost.then(function (pl)
                         {
                            $scope.orderid = pl.data.orderid;
                            loadRecords();
                            $scope.IsNewRecord = 0;
                            $scope.Message = "Added Successfuly";
                         }, 
                         function (err) 
                         {
                            console.log("Err" + err);
                         });
                    }  

                   else 
                   { //Else Edit the record
                       var promisePut = orderService.put($scope.orderid,Order);
                       promisePut.then(function (pl) 
                       {
                           $scope.Message = "Updated Successfuly";
                           loadRecords();
                       }, 
                       function (err)
                       {
                            console.log("Err" + err);
                       });
                }             
    };
 
        
   // Method to Delete
     $scope.delete = function () {
        var promiseDelete = orderService.delete($scope.orderid);
        promiseDelete.then(function (pl) 
        {
            $scope.orderid = "";
            $scope.purchase_order_no = "";
            $scope.po_date = "";
            $scope.last_date = "";
            $scope.service="";
            $scope.numberofunits="";
            $scope.priceperunit="";
           
            loadRecords();
            $scope.Message = "Deleted Successfuly";
        }, 
        function (err)
         {
            console.log("Err" + err);
         });
    }
     
    //Clear the Scope models
         $scope.clear = function () 
             {
                     $scope.IsNewRecord = 1;
                     $scope.Message="";
                     $scope.orderid="";
                     $scope.purchase_order_no="";
                     $scope. po_date="";
                     $scope.last_date="";
                     $scope.service="";
                     $scope.numberofunits="";
                     $scope.priceperunit="";
                    
             };
    });   