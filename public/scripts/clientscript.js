console.log('sourced');

var lock = new Auth0Lock('AZbjJYNI6Xex9lDI8wvgCCdx9NiqHPl8', 'wibajohnson.auth0.com');
var logOutURL = 'blank';

var myApp = angular.module('myApp', []);

myApp.controller('loginPageController', ['$scope', '$http', function($scope,$http){
  console.log('NG');

  //run at controller load
  $scope.init = function(){
    console.log( 'in init' );
    // check if a user's info is saved in localStorage
    if( JSON.parse( localStorage.getItem( 'userProfile' ) ) ){
      // if so, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile' ) );
      console.log( 'loggedIn:', $scope.userProfile );
      $scope.showUser = true;
    }//end if
    else{
      // if not, make sure we are logged out and empty
      emptyLocalStorage();
      $scope.showUser = false;
    }//end else
  } // end init function

  $scope.logIn =function(){
    console.log('in logIn scope');
    lock.show(function(err,profile,token){
      if (err) {
        console.error('auth err', err);
      }
      else {
        // save token to localStorage
        localStorage.setItem( 'userToken', token );
        // save user profile to localStorage
        localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
        location.reload();
      } // end no error
    }); //end lock.show
}; // end scope.logIn

$scope.logOut = function(){
   // call our logOutUrl
   $http({
     method:'GET',
     url: logOutUrl,
   }).then( function( data ){
     // if logged out OK
     if( data.data == 'OK' ){
       // empty localStorage
       emptyLocalStorage();
       $scope.showUser = false;
     }
   })
 }; // end scope.logOut

 // run init on controller load
 $scope.init();
//
//
// myApp.controller("addController",['$scope', '$http', function($scope, $http){
// console.log('in addController');
//
// }]);//end addController

$scope.addItem = function(){
  var newItem={

    name: $scope.itemName,
    description: $scope.itemDescription,
    owner: $scope.itemOwner,
    imageURL: $scope.itemURL
  }//end newItem
  console.log('newItem',newItem);
  $http({
    method: 'POST',
    url: '/addItem',
    data: newItem
  }).then(function(response){
    console.log('returned from server ', response);
    $scope.displayName= response.data.name;
    $scope.displayDescription= response.data.description;
    $scope.displayOwner= response.data.owner;
    $scope.displayImageURL= response.data.imageURL;

    //empty input fields
    $scope.itemName="";
    $scope.itemDescription="";
    $scope.itemOwner="";
    $scope.itemURL="";
  })//end return
}//end addItem


$scope.displayItem=function(){
  $http({
    method: 'GET',
    url: '/viewItem'
  }).then(function(response){
    console.log('returned from server ', response);
    $scope.allItems = response.data;
  })//end return
};//end displayItem
}]);//end loginPageController

var emptyLocalStorage = function(){
 localStorage.removeItem( 'userProfile' );
 localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage
