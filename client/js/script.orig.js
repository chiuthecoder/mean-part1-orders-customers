var myApp = angular.module('myApp', ['ngRoute']);

    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/orders.html'
        })
        .when('/users',{
            templateUrl: 'partials/users.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    myApp.factory('ordersFactory', function(){
      //users stuff
      var errors = {};
      var users = [
          {name:'John Doe', created: '2015-04-02'},
          {name:'Jane Doe', created: '2015-04-02'},
          {name:'April Doe', created: '2015-05-02'},
          {name:'Zoe Doe', created: '2015-05-02'}
        ];
        //order stuff
        var products =  [
          {product:'Soup'},
          {product:'Pizza'},
          {product:'Ice Cream'},
          {product:'Candy'}
        ];
        var quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        var orders = [
          {name:'Dog Doe', product: 'Ice Cream', quantity: 5, created: '2015-04-02'},
          {name:'Cat Doe', product: 'Candy', quantity: 5, created: '2015-05-02'}
        ];
        var factory = {};
        factory.getUsers = function(callback){
          callback(users);
        }; 
        factory.addUser= function(data){
          for (var i=0; i<users.length; i++){
            if(data.name === users[i].name){
              errors.message = "The name already exists.";
              return false;
            }
          }
          users.push({name: data.name, created: Date()});        
        };
        factory.errorMessages = function(){
          return errors;
        };
        factory.removeUser = function(name){
          users.splice(users.indexOf(name), 1);
        };

        factory.getProducts = function(callback){
          callback(products);
        };
        factory.getQuantities = function(callback){
          callback(quantities);
        };
        factory.getOrders = function(callback){
          callback(orders);
        };
        factory.addOrder = function(data){
          // console.log(data);
          orders.push({name: data.name, product: data.product, quantity: data.quantity, created: Date()});   
        };
        factory.removeOrder = function(name){
          orders.splice(orders.indexOf(name), 1);
        };        
        
        return factory;
    });

    myApp.controller('usersController', function ($scope, ordersFactory){
        $scope.users = [];
        $scope.errors = {};
        ordersFactory.getUsers(function(data){
          $scope.users = data;
        });  
        $scope.addUser = function(){
          ordersFactory.addUser($scope.newUser);
          $scope.newUser = {};
        };
        $scope.errors = ordersFactory.errorMessages();
        $scope.removeUser= function(name){
          ordersFactory.removeUser(name);
        }
    });

    //order controller
    myApp.controller('ordersController', function ($scope, ordersFactory){
        $scope.orders = [];
        // $scope.users = [];
        $scope.products = [];
        $scope.quantities = [];
        ordersFactory.getOrders(function(data){
          $scope.orders = data;
        });
        ordersFactory.getUsers(function(data){
          $scope.users = data;
        });
        ordersFactory.getProducts(function(data){
          $scope.products = data;
        });
        ordersFactory.getQuantities(function(data){
          $scope.quantities = data;
        });
        $scope.addOrder = function(){
          // console.log($scope.newOrder);
          // console.log($scope.newOrder);
          ordersFactory.addOrder($scope.newOrder);
          $scope.newOrder = {};
        };
        $scope.removeOrder= function(name){
          ordersFactory.removeOrder(name);
        }
    });