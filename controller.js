/// <reference path="./bower_components/angular/angular.min.js" />
/// <reference path="./app.js" />

//The controller is having 'crudService' dependency.
//This controller makes call to methods from the service 
app.controller('crudController', function ($scope, crudService) {
    
    $scope.IsNewRecord = 1; //1 for the flag for the new record
 
  loadRecords(); 
 
   //Function to load all Client records
    function loadRecords() {
        var promiseGet = crudService.getClients(); //Method Call from the service
 
        promiseGet.then(function (pl) { 
            $scope.Client = pl.data.rows
        },
              function (errorPl) {
                  $log.error('failure loading Client', errorPl);
              });
    }
     
  //  The Save scope method use to define the Client object.
  //  In this method if IsNewRecord is zero then Update record else 
   // Create the client information to the server
    $scope.save = function () {
        var Client = {
            clientid: $scope.clientid,
            name: $scope.name,
            address: $scope.address,
            phone:$scope.phone,
            cmp_email:$scope.cmp_email,
            person_name:$scope.person_name,
            person_phone:$scope.person_phone,
            person_email:$scope.person_email,
            shipping_add:$scope.shipping_add
           
        };
    //    If the flag is 1 the it is new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = crudService.post(Client);
            promisePost.then(function (pl) {
                $scope.clientid = pl.data.clientid;
                loadRecords();
                $scope.IsNewRecord = 0;
                $scope.Message = "Added Successfuly";
            }, function (err) {
                console.log("Err" + err);
            });
        
        }            
    }
 // Method to Delete
  $scope.delete = function () {
        var promiseDelete = crudService.delete($scope.clientid);
        promiseDelete.then(function (pl) 
        {
            $scope.Message = "Deleted Successfuly";
            $scope.clientid="";
            $scope.name="";
            $scope.address="";
            $scope.phone="";
            $scope.cmp_email="";
            $scope.person_name="";
            $scope.person_phone="";
            $scope.person_email="";
            $scope.shipping_add="";
           
            loadRecords();
            
        }, 
        function (err)
         {
            console.log("Err" + err);
         });
    }
   
      //Clear the Scope models
         $scope.clear = function () {
                 $scope.IsNewRecord = 1;
                 $scope.clientId = "";
                 $scope.name = "";
                 $scope.address = "";
                 $scope.phone="";
                 $scope.cmp_email="";
                 $scope.person_name="";
                 $scope.person_phone="";
                 $scope.person_email="";
                $scope.shipping_add="";
                $scope.Message="";
    }
    });   