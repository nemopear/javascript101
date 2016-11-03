$(function () {
    setTimeout(function () {
        $('.boxLinkTitle, .boxLinkTitleHover, .boxLinkDescription').trigger('destroy');
        truncateText('.boxLinkTitle, .boxLinkTitleHover, .boxLinkDescription');
    }, 200);
});

function BoxLink() {
    var box3 = $('.boxItem3 .boxLinkItem');
    var box4 = $('.boxItem4 .boxLinkItem');

    this.boxHeight = function () {
        var heightBox3 = box3.width();
        box3.css('height', heightBox3);
        var heightBox4 = box4.width();
        box4.css('height', heightBox4);
    };
}

$(window).load(function () {
    var boxLink = new BoxLink();
    setTimeout(function () {
        boxLink.boxHeight();
    }, 500);
});

$(document).ready(function () {
    var boxLink = new BoxLink();
    setTimeout(function () {
        boxLink.boxHeight();
    }, 500);
});

var setTimeDotDotDot = undefined;
$(window).resize(function () {
    var boxLink = new BoxLink();
    if (setTimeDotDotDot != undefined) {
        clearTimeout(setTimeDotDotDot);
        setTimeDotDotDot = undefined;
    }
    setTimeDotDotDot = setTimeout(function () {

        boxLink.boxHeight();
        $('.boxLinkTitle, .boxLinkTitleHover, .boxLinkDescription').trigger('destroy');
        truncateText('.boxLinkTitle, .boxLinkTitleHover, .boxLinkDescription');

        setTimeDotDotDot = undefined;
    }, 700);
});