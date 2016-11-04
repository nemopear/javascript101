$(function () {
    setTimeout(function () { truncateText('.staffNameHover'); }, 200);
});


var eventName = ('ontouchstart' in window) ? 'click' : 'mouseenter mouseleave';

$('.staffItem').on(eventName, function () {
	$(this).toggleClass('active');
	var checkActive = $(this).hasClass('active');
	console.log(checkActive);
	$('.staffItem').removeClass('active');
	if (checkActive) {
		$(this).addClass('active');
	}
});

// $('body').on('click', function (event) {
// 	var element = event.target;
// });




// $('.staffItem').on('mouseover', function () {
//     $(this).addClass('active');
// }).on('mouseout', function () {
//     $(this).removeClass('active');
// });