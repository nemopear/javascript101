function Header() {

    var context;
    this.header = $('.header');
    this.mainMenu = $('.mainMenu');
    this.toggleMenu = $('.navbar-toggle');
    this.openSubMenuButton = $('.openSubmenu');
    this.body = $('body');
    this.html = $('html');
    this.isMenuOpen = false;
    this.firstLevelMenu = $('.menuList ul')

    this.init = function () {
        this.onWindowLoad();
        this.onScreenChange();
        this.viewPort();
        this.openCloseMainMenu();
        this.openCloseSubmenu();
        //this.menuMaxheight();
    }

    this.onScreenChange = function () {
        $(window).resize(function () {
            context.viewPort();
            context.lockScroll();
            context.menuSticky();
        });
    }

    this.onWindowLoad = function () {
        $(window).load(function () {
            context.menuSticky();
        });
    }

    this.viewPort = function () {
        /* Each brouser have different vertical scrollbar */
        var scrollBarWidth = window.innerWidth - this.body.width();
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
        if (!is_safari) {
            if ($(window).width() > (992 - scrollBarWidth)) {
                this.isDestop = true;
            } else {
                this.isDestop = false;
            }
        } else if ($.browser.chrome) {
            if ($(window).width() > (992 - scrollBarWidth)) {
                this.isDestop = true;
            } else {
                this.isDestop = false;
            }
        } else {
            if ($(window).width() > 992) {
                this.isDestop = true;
            } else {
                this.isDestop = false;
            }
        }
    }

    this.openCloseMainMenu = function () {
        this.toggleMenu.click(function () {
            if (!$(this).hasClass('menuActive')) {
                $(this).addClass('menuActive');
                context.mainMenu.slideDown(300);
                context.isMenuOpen = true;
                context.lockScroll();
            }else{
                $(this).removeClass('menuActive');
                context.mainMenu.slideUp(300);
                context.isMenuOpen = false;
                context.lockScroll();
            }
        });
    }

    this.openCloseSubmenu = function () {
        this.openSubMenuButton.click(function () {
            if (context.isDestop == false) {
                if ($(this).parent().hasClass('menuOpen')) {
                    /* Close sub menu*/
                    $(this).parent().removeClass('menuOpen');
                    $(this).siblings('ul').slideUp(300);
                } else {
                    /* Open sub menu*/
                    $(this).parent().addClass('menuOpen');
                    $(this).siblings('ul').slideDown(300);
                }
            }
        });
    }

    this.menuMaxheight = function () {
        this.firstLevelMenu.each(function () {
            if (context.isDestop) {
                var menuMaxHeight = $(window).height() - $(this).offset().top;
                $(this).css('max-height', menuMaxHeight);
            } else {
                $(this).css('max-height', 'initial');
            }
        });   
    }

    this.menuSticky = function () {
        var headerHeight = this.header.height();
        this.body.css('padding-top', headerHeight);
    }

    this.lockScroll = function () {
        if (this.isDestop == false) {
            if (this.isMenuOpen) {
                this.html.addClass('modal-open');
                this.body.addClass('modal-open');
            } else {
                this.html.removeClass('modal-open');
                this.body.removeClass('modal-open');
            }
        } else {
            this.html.removeClass('modal-open');
            this.body.removeClass('modal-open');
        }
    }

    context = this;
    this.init();

}
$(document).ready(function () {
    var header = new Header();
});