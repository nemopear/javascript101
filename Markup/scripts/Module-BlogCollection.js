$(function () {
    $('.authorName').trigger('destroy');
    setTimeout(function () { truncateText('.authorName'); }, 300);
});

$(window).resize(function () {
    setTimeout(function () {
        $('.authorName').trigger('destroy');
        truncateText('.authorName');
    }, 300);
});