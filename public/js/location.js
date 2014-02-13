function getLocation(accessPoint) {
	var key = $('#key').text();
	var form = document.forms['comfort'];
	$.ajax({
		url: '/api/aplist?key=' + key,
		dataType: 'json',
		success: function(data) {
			console.log(data);
			var location = data[accessPoint];
			form.elements['location'].value = location;
		},
		error: function(req, err, exception) {
			console.log("couldn't get user location");
		}
	});
}

function extractAP(rawHtml) {
	// TODO implement this method
}

$(document).ready(function ($) {
	$.ajax({
		url: 'http://yamaha.bucknell.edu/cgi-bin/client_status.pl',
		dataType: 'html',
		error: function(data) {
			userAP = extractAP(data);
			getLocation(userAP);
		},
		success: function(req, err, exception) {
			$connectionError = $(
				'<div class="alert alert-warning error">'
				+'<p>'
				+'<strong>WARNING</strong> '
				+'Connect to WiFi to improve your location.'
				+'</p>'
				+'</div>');
			$('#content').prepend($connectionError);
		}
	});
});