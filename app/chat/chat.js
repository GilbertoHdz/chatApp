angular.module('appChat')
.controller('ChatCtrl', function ($scope, $location, socketChat) {

 	socketChat.on('user joined', function (data) {
	    $("#ulChat").append(getComment("System: Se Ha Conectado: " +data.username, "", '2D882D/fff&text=SYS'));
  	});

  	socketChat.on('get msg', function (msj, user, avatar) {
	    $("#ulChat").append(getComment(user, msj, avatar+'/fff&text=U'));
  	});

  	$scope.sendMsj = function(msj) {
  		miUsuario = true;
  		$scope.msj = "";
      	socketChat.emit('send msg', {'msg':msj, 'avatar': getRandomColor() });
	};

  	function getComment (NombUsuario, setComment, img) {

  		return "<li class='left clearfix' > " +
  				"<span class='chat-img pull-left' > " +
  					"<img src='http://placehold.it/50/" + img + "' alt='User Avatar' class='img-circle' />" +
  				"</span>" +
  				"<div class='chat-body clearfix' > " +
  					"<div class='header'>" +
  						"<strong class='primary-font'>"+ NombUsuario +"</strong> " +
  					"</div>" +
  					"<p>"+setComment+"</p>" +
  				"</div>" +
  			"</li>";
  	}

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