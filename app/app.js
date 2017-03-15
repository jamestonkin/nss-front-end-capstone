'use strict';

var app = angular.module("TrumpApp", ["ngRoute"]);

//used to authenticate user when navigating to other views
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
	AuthFactory.isAuthenticated()
	.then ( (userExists) => {
    console.log("userExists", userExists);
		if (userExists){
      console.log("Authenticated, go ahead.");
			resolve();
		}else {
      console.log("Authentication rejected, go away.");
			reject();
		}
	});
});

app.config(function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: "partials/login.html",
    controller: "UserCtrl"
  }).
  when('/login', {
    templateUrl: "partials/login.html",
    controller: "UserCtrl"
  }).
  when('/logout', {
    templateUrl: "partials/login.html",
    controller: "UserCtrl"
  }).
  when('/about', {
    templateUrl: "partials/about.html",
    //controller: "UserCtrl",
		resolve: {isAuth}
  }).
  when('/account', {
    templateUrl: "partials/account.html",
    controller: "AccountCtrl",
    resolve: {isAuth}
  }).
  when('/account/edit', {
    templateUrl: "partials/account-edit.html",
    controller: "CompanyEditCtrl",
    resolve: {isAuth}
  }).
  when('/account/tweets', {
    templateUrl: "partials/tweets.html",
    controller: "TrackedTweetsCtrl",
    resolve: {isAuth}
  }).
  when('/account/tweets/:tweetId', {
    templateUrl: "partials/stock.html",
    controller: "StockCtrl",
    resolve: {isAuth}
  }).
  otherwise('/');
});

// Run when the app loads
app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
    databaseURL: creds.databaseURL
	};
	firebase.initializeApp(authConfig);
});
