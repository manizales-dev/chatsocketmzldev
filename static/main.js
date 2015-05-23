var socket = io.connect(document.location.protocol+'//'+document.location.host);

$(function() {
	// declare DOM elements for manipulation
	var $app = $('.app');
	var $messages = $app.find('.messages');
	var $messagescontainer = $app.find('.messages-container');
	var $messageinput = $app.find('.messageinput').removeAttr('disabled').focus();
	var $nameinput = $app.find('.nameinput');

	// define listener to receive message
	socket.on('mensaje', function(message) {
		$('.messages').append($('<li>', {'class':'message', text:message.username+': '+message.text}));
		console.log('Received: ', message);
		$messagescontainer.scrollTop($messagescontainer.prop('scrollHeight'));
	});

	// define event to send message to server
	$messageinput.on('keypress', function(event) {
		if (event.keyCode == 13) {
			message = {
				username: $nameinput.val(),
				text: $messageinput.val().trim()
			};
			console.log('Send message: ', message);
			socket.emit('mensaje', message);
			$messageinput.val('');
		}
	});
});