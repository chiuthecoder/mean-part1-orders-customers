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
        .when('/products',{
            templateUrl: 'partials/products.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    //===== user =====//
    myApp.factory('ordersFactory', function($http){
        var factory = {};
        //===== user =====//
        factory.getUsers = function(callback){
          $http.get('/users').success(function(returned_data){
            callback(returned_data);
          })
        }; 
        factory.addUser= function(newUser, callback){
          // users.push({name: data.name, created: Date()});
          $http.post('/users', newUser).success(function(returned_data){
            console.log('Back from server', returned_data);
            console.log('Back from server-user', newUser);
            // console.log('Back from server-users', users);
            callback(returned_data);
          })                  
        };
        factory.removeUser = function(data, callback){
          console.log('try to remove a user-factory', data);
          $http.get('/users/'+data).success(function(){
            callback();
          }) 
        };
        //===== product =====//
        factory.getProducts = function(callback){
          $http.get('/products').success(function(returned_data){
            callback(returned_data);
          })
        }; 
        factory.addProduct= function(newProduct, callback){
          // users.push({name: data.name, created: Date()});
          $http.post('/products', newProduct).success(function(returned_data){
            console.log('Back from server', returned_data);
            console.log('Back from server-product', newProduct);
            // console.log('Back from server-users', users);
            callback(returned_data);
          })                  
        };
        factory.removeProduct = function(data, callback){
          console.log('try to remove a product-factory', data);
          $http.get('/products/'+data).success(function(){
            callback();
          }) 
        };
        //===== order =====//
        factory.getQuantities = function(callback){
          $http.get('/orders').success(function(returned_data){
            callback(returned_data);
          }) 
        };
        factory.getOrders = function(callback){
          $http.get('/orders').success(function(returned_data){
            callback(returned_data);
          })
        }; 
        factory.addOrder= function(newOrder, callback){
          // users.push({name: data.name, created: Date()});
          $http.post('/orders', newOrder).success(function(returned_data){
            console.log('Back from server', returned_data);
            console.log('Back from server-product', newOrder);
            // console.log('Back from server-users', users);
            callback(returned_data);
          })                  
        };
        factory.removeOrder = function(data, callback){
          console.log('try to remove a product-factory', data);
          $http.get('/orders/'+data).success(function(){
            callback();
          }) 
        };     
        return factory;
    });

    myApp.controller('usersController', function ($scope, ordersFactory){
        // $scope.users = [];
        // $scope.errors = {};
        var updateUsersList = function(){
          ordersFactory.getUsers(function(data){
          $scope.users = data;
          }); 
        }
        updateUsersList();

        $scope.addUser = function(){
          ordersFactory.addUser($scope.newUser, function(users){
            updateUsersList();
            })
          $scope.newUser = {};
        };

        $scope.removeUser = function(data){
          console.log("scope.removeUser", data);
          ordersFactory.removeUser(data, function(data){
            updateUsersList();
          })
        };

    });

    myApp.controller('productsController', function ($scope, ordersFactory){
        // $scope.users = [];
        // $scope.errors = {};
        var updateProductList = function(){
          ordersFactory.getProducts(function(data){
          $scope.products = data;
          }); 
        }
        updateProductList();

        $scope.addProduct = function(){
          ordersFactory.addProduct($scope.newProduct, function(products){
            updateProductList();
            })
          $scope.newProduct = {};
        };

        $scope.removeProduct = function(data){
          console.log("scope.removeProduct", data);
          ordersFactory.removeProduct(data, function(data){
            updateProductList();
          })
        };
    });

    myApp.controller('ordersController', function ($scope, ordersFactory){
        // $scope.users = [];
        // $scope.errors = {};
        var updateOrderList = function(){
          ordersFactory.getOrders(function(data){
          $scope.orders = data;
          }); 
        }
        updateOrderList();

        ordersFactory.getUsers(function(data){
          $scope.users = data;
        });
        ordersFactory.getProducts(function(data){
          $scope.products = data;
        });
        ordersFactory.getQuantities(function(data){
          console.log('is this data?', data);
          // console.log('is this quantities?', quantities)
          $scope.quantities = data;
        });

        $scope.addOrder = function(){
          ordersFactory.addOrder($scope.newOrder, function(orders){
            updateOrderList();
            })
          $scope.newOrder = {};
        };

        $scope.removeOrder = function(data){
          console.log("scope.removeOrder", data);
          ordersFactory.removeOrder(data, function(data){
            updateOrderList();
          })
        };       

    });