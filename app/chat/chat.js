angular.module('appChat')
.controller('ChatCtrl', function ($scope, $location, socketChat) {

  $scope.mensajes = [];

 	socketChat.on('user joined', function (data) {
    console.log("user joined");
  });

  	socketChat.on('get msg', function (msj, user, avatar) {
	     $scope.mensajes.push({'msj' : msj, 'user': user, 'avatar':avatar});
       console.log($scope.mensajes);
  	});

  	$scope.sendMsj = function(msj) {
  		miUsuario = true;
  		$scope.msj = "";
      	socketChat.emit('send msg', {'msg':msj, 'avatar': getRandomColor() });
	};

  	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

})
.factory('socketChat', function ($rootScope) {
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