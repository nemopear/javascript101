$(function () {
    $('.niftyTitle,.niftyDescription').trigger('destroy');
    setTimeout(function () { truncateText('.niftyTitle,.niftyDescription'); }, 200);
});

$(window).resize(function () {
    setTimeout(function () {
        $('.niftyTitle,.niftyDescription').trigger('destroy');
        truncateText('.niftyTitle,.niftyDescription');
    }, 200);
});