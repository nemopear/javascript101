// if $.browser is not defined
(function ($) {
    if ("undefined" == typeof $.browser) {
        $.uaMatch = function (a) { a = a.toLowerCase(); a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || []; return { browser: a[1] || "", version: a[2] || "0" } }; var matched = $.uaMatch(navigator.userAgent), browser = {}; matched.browser && (browser[matched.browser] = !0, browser.version = matched.version); browser.chrome ? browser.webkit = !0 : browser.webkit &&
        (browser.safari = !0); $.browser = browser
    };
})(jQuery);

//os and browser detector
var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "macos";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";

$('html').removeClass('no-js');
$('html').addClass(OSName);

$.each($.browser, function (a, b) {
    if (a != 'version') {
        if (a == 'msie') {
            var v = Math.floor($.browser.version);
            $('html').addClass('ie ie' + v);
            for (var i = v; i <= 10; i++) if (v < i) $('html').addClass('lt-ie' + i);
        }
        else $('html').addClass(a);
    }
    if (navigator.userAgent.match(/Trident\/7\./)) {
        $('html').addClass('ie11');
    }
});

function GetIE11Detection() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        setTimeout(function () { $('html').removeClass('mozilla'); }, 100);
        $('html').addClass('ie11');
    }
}

/* footer alway bottom */
function footerAlwaysBottom() {
    var footerHeight = $('.footer').outerHeight(true);
    $('body').css('padding-bottom', footerHeight);
    $('.footer').addClass('footerStick');
}

/* blocks same height */
function equalHeight(container) {
    var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0; $(container).each(function () {
         $el = $(this);
         $($el).height('auto')
         topPostion = $el.position().top;
         if (currentRowStart != topPostion) {
             for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                 rowDivs[currentDiv].height(currentTallest);
             }
             rowDivs.length = 0; // empty the array
             currentRowStart = topPostion;
             currentTallest = $el.height();
             rowDivs.push($el);
         } else {
             rowDivs.push($el);
             currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
         }
         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
             rowDivs[currentDiv].height(currentTallest);
         }
     });
}

function childEqualHeight(container, childElement) {
    var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
    $(container).each(function () {
        $el = $(this);
        $($el).find(childElement).height('auto')
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].find(childElement).height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.find(childElement).height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.find(childElement).height()) ? ($el.find(childElement).height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].find(childElement).height(currentTallest);
        }
    });
}

function truncateText(element) {
    $(element).dotdotdot({
        ellipsis: '... ',
        wrap: 'letter',
        watch: true
    });
}

function onContentReady() {
    $('body').css('visibility', 'visible').hide().fadeIn(500);
}

$(function () {
    GetIE11Detection();
});

$(window).load(function () {
    onContentReady();
});