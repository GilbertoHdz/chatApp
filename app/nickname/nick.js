angular.module('appChat')
.controller('NickCtrl', function ($scope, $location, socketNick) {

	$scope.ingresar = function(usuario) {
		console.log(usuario);
      	socketNick.emit('add user', usuario);
      	$location.path('/michat');
	};

}).factory('socketNick', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
