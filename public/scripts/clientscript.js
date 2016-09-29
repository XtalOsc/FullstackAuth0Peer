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


//on log in show form to add item / delete button
// http call to get items from DB
//


}]);//end loginPageController
