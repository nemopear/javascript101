$(document).ready( function() {
	getHeight();
});

$(window).resize( function() {
	getHeight();
});

function getHeight() {
	var heightBox = $('.boxLinkItem').width();
	$('.boxLinkItem').css('height',heightBox);
	console.log(heightBox);
}