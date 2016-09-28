console.log('sourced');

var lock = new Auth0Lock('CLIENTID', 'DOMAIN');
var logOutURL = 'blank';

var myApp = angular.module('myApp', []);

myApp.controller('loginPageController', ['$scope', '$http', function($scope,$http){
  console.log('NG');

$scope.logIn =function(){
console.log('in logIn scope');
lock.show(function(err,profile,token){
  if (err) {
    console.error('auth err', err);
  }else {
    localStorage.setItem('userToken', token);
    localStorage.setitem('userProfile', JSON.stringify(profile));
    location.reload();
  }//end else
});//end lock.show function
};//end login scope function

//on log in switch to page 2
//if view items clicked hide add new item form
}]);//end loginPageController

myApp.config(['$routeProvider', function($routeProvider){
$routeProvider.
when('/home',{
  templateUrl:'/partials/home.html',
  controller: 'homeController'
}).
when('/view',{
templateUrl: '/partials/view.html',
controller: 'viewController'
}).
otherwise({
  redirectTo:'/home'
});

}]);
