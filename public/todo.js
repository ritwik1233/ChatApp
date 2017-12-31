var app = angular.module('myApp', ['ngRoute']);

app.factory('socket', ['$rootScope', function($rootScope) {
  
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/login.html',
    controller  : 'loginController'
  })

  .when('/chat', {
    templateUrl : 'pages/chat.html',
    controller  : 'chatController'
  })
   .when('/home', {
    templateUrl : 'pages/home.html',
    controller  : 'HomeController'
  })
    .when('/register', {
    templateUrl : 'pages/registration.html',
    controller  : 'RegisterController'
  })


  .otherwise({redirectTo: '/'});
});

app.controller('loginController', function($scope, $location,$http) {
  $scope.message = 'Hello from loginController';
    $scope.login = function() {
        var user={
            email:$scope.email,
            password:$scope.password
              }
          console.log($scope.email);
          console.log($scope.password);
          $http.post('/post', user).success(function(data){
            if(data=="success")
            {
                 $location.path('/home');
             }
             else
             {
                $location.path('/');
             }
               })
     }
});


app.controller('chatController', function($scope, socket) {
  $scope.newCustomers = [];
  $scope.currentCustomer = {};
  $scope.join = function() {
    socket.emit('add-customer', $scope.currentCustomer);
  };
  socket.on('notification', function(data) {
    $scope.$apply(function () {
      $scope.newCustomers.push(data);
    });
  });
});


app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

app.controller('RegisterController', function($scope,$location,$http) {
  $scope.message = 'Hello from RegisterController';
  $scope.register = function() {
    var userdetails=
    {
        username:$scope.username,
        email:$scope.email,
        password:$scope.password
    }
$http.post('/register', userdetails).success(function(data){

            if(data=="success")
            {
                 $location.path('/');
             }
             else
             {
               $location.path('/register');  
             }
               })
      
     }
});


