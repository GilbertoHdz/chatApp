var socket = io();

$(document).ready(function () {
	$("form").submit(function () {
		var mensaje = $("#msj").val();
		if (mensaje=='') return false;

		//Evento message en el server managger
		socket.emit('send msg', mensaje);
		$("#msj").val('').focus();
		return false;
	});

	$("#channel").change(function() {
		socket.emit('change channel' , $("#channel").val());
	});

});

socket.on('get msg', function (msj, id) {
	//alert('Adios Usuario: '+id);
	$("#messages").append($('<li>').text( id + ' : '+ msj));
});

socket.on('change channel', function (channel) {
	$("#messages").html('').append($('<li>').text('System : Bienvenido al Canal: '+channel +'!'));
});