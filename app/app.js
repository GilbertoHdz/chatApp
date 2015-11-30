angular.module('appChat', [
	'ngRoute',
	'btford.socket-io'
	]
)
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {
			templateUrl: '/nickname/nick.html',
			controller: 'NickCtrl'
		})
		.when('/michat', {
	        templateUrl: '/chat/chat.html',
	        controller: 'ChatCtrl'
        })
    .otherwise({
        	redirectTo: '/'
        });

    $locationProvider.html5Mode(false);

});