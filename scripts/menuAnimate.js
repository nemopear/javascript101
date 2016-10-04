// Hide Header on on scroll down
window.onload = function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#mainMenu').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(window).scrollTop();
        var mainMenuHeight = $('#mainMenu').height();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('#mainMenu').removeClass('nav-down').addClass('nav-up');
            $('.nav-up').css({ top: '-'+mainMenuHeight + 'px' });
            console.log('Mainmenu height' + mainMenuHeight);
        } else {
            // Scroll Up
            $('#mainMenu').removeClass('nav-up').addClass('nav-down');
            $('.nav-down').css({ top: '0' });


            if (st + $(window).height() < $(document).height()) {
                $('#mainMenu').removeClass('nav-up').addClass('nav-down');
                $('.nav-down').css({ top: '0' });

            }
            else if (st < mainMenuHeight) {
                $('.nav-down').css({ top: '0' });
            }

        }

        lastScrollTop = st;
    }
};

function sticky_relocate() {
    var windowPosTop = $(window).scrollTop();
    var bodyContainerTop = 83;
    if (windowPosTop > bodyContainerTop) {
        $('#stickyMenu').addClass('minimize').fadeIn();
    }
    else {
        $('#stickyMenu').removeClass('minimize');
    }
};

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});


$(document).ready(function () {
    $('#bodyContainer').click(function () {
        if ($('.navbar-collapse').hasClass('in')) {
            $("button.navbar-toggle").click();
        }
        else {

        }
    });
});