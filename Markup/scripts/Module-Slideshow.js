function TopSlideshow(element) {
    var context;
    this.carousel = $(element);
    this.responsiveOption = {};
    this.body = $('body');
    this.slideContent = this.carousel.find('.slideContentContainer');

    this.init = function () {
        this.onScreenChange();
        this.slides = this.carousel.find('.slideItem');
        this.isCarousel = this.carousel.attr('data-isCarousel') ? true : false;
        this.hasMargin = this.carousel.attr('data-margin') ? true : false;
        this.margin = this.hasMargin ? parseInt(this.carousel.attr('data-margin')) : 0;
        this.needArrowPosition = this.carousel.attr('data-needArrowPosition') ? true : false;
        this.isAutoHeight = this.carousel.attr('data-isAutoHeight') ? true : false;
        this.responsiveOption = this.responsiveOptions();
        if (this.slides.length >= 1) {
            this.viewPort();
            this.create();
        }
    }

    this.onScreenChange = function () {
        $(window).resize(function () {
            context.viewPort();
        });
    }

    this.create = function () {
        this.setTiming();
        var isPlay = this.slides.length > 1 ? true : false;
        this.carousel.owlCarousel({
            autoplay: isPlay,
            autoplayTimeout: this.playTime,
            smartSpeed: this.transitionTime,
            items: 1,
            margin: this.margin,
            autoHeight: this.isAutoHeight,
            nav: true,
            dots: isPlay,
            navText: ["<i class='iconFont-i-arrow-left'></i>", "<i class='iconFont-i-arrow-right'></i>"],
            responsive: this.responsiveOption,
            onInitialized: function (property) {
                if (context.needArrowPosition) {
                    context.arrowPosition(property);
                }
            },
            onResized: function (property) {
                if (context.needArrowPosition) {
                    setTimeout(function () { context.arrowPosition(property); }, 200);
                }
            }
        });

        this.carousel.on('changed.owl.carousel', function (property) {
            if (context.needArrowPosition) {
                setTimeout(function () { context.arrowPosition(property); }, 200);
            }
        });
    }

    this.responsiveOptions = function () {
        this.setItemsResponsive();
        this.setItemsMargin();
        var options = {
            0: {
                margin: parseInt(this.marginMobile),
                items: parseInt(this.responsiveMobile),
                loop: this.isCarousel ? (this.slides.length <= parseInt(this.responsiveMobile) ? false : true) : true
            },
            768: {
                margin: parseInt(this.marginTablet),
                items: parseInt(this.responsiveTablet),
                loop: this.isCarousel ? (this.slides.length <= parseInt(this.responsiveTablet) ? false : true) : true
            },
            992: {
                margin: parseInt(this.marginLabtop),
                items: parseInt(this.responsiveLabtop),
                loop: this.isCarousel ? (this.slides.length <= parseInt(this.responsiveLabtop) ? false : true) : true
            },
            1200: {
                margin: parseInt(this.marginDesktop),
                items: parseInt(this.responsiveDesktop),
                loop: this.isCarousel ? (this.slides.length <= parseInt(this.responsiveDesktop) ? false : true) : true
            }
        }
        
        return options;
    }

    this.setTiming = function () {
        this.transitionTime = parseInt(this.carousel.attr('data-transitionTime'));
        this.pauseTime = parseInt(this.carousel.attr('data-pauseTime'));
        this.playTime = this.pauseTime;
        this.playTime = 0;
        if (this.transitionTime < 500) {
            this.transitionTime = 500;
        }
        this.playTime = this.pauseTime + this.transitionTime;

    }

    this.setItemsResponsive = function () {
        this.dataResponsiveItem = this.carousel.attr('data-responsiveItem');
        if (this.dataResponsiveItem != null) {
            var responsiveNumberItem = [];
            responsiveNumberItem = this.dataResponsiveItem.split(",");

            this.responsiveMobile = responsiveNumberItem[0];
            this.responsiveTablet = responsiveNumberItem[1];
            this.responsiveLabtop = responsiveNumberItem[2];
            this.responsiveDesktop = responsiveNumberItem[3];
        } else {
            this.responsiveMobile = 1;
            this.responsiveTablet = 1;
            this.responsiveLabtop = 1;
            this.responsiveDesktop = 1;
        }
    }

    this.setItemsMargin = function () {
        this.marginResponsive = this.carousel.attr('data-margin');
        if (this.marginResponsive != null) {
            var marginNumberItem = [];
            marginNumberItem = this.marginResponsive.split(",");

            this.marginMobile = marginNumberItem[0];
            this.marginTablet = marginNumberItem[1];
            this.marginLabtop = marginNumberItem[2];
            this.marginDesktop = marginNumberItem[3];
        } else {
            this.marginMobile = 1;
            this.marginTablet = 1;
            this.marginLabtop = 1;
            this.marginDesktop = 1;
        }
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

    this.arrowPosition = function (property) {
        this.owlNav = this.carousel.find('.owl-nav');
        if (property != null) {
            var currentIndex = property.page.index;
            if (this.isDestop == false) {
                if (property.page.index == -1) {
                    currentIndex = 0;
                }
                console.log(currentIndex);
                var slideshowHeight = this.carousel.height();
                var slideshowContentHeight = $(property.target).find('.owl-item').eq(currentIndex).find('.slideContentContainer').outerHeight(true);
                console.log(slideshowContentHeight);
                var arrowHeight = this.owlNav.children().height();
                var arrowTop = ((slideshowHeight - slideshowContentHeight) / 2) - (arrowHeight / 2);

                this.owlNav.children().css('top', arrowTop);
            } else {
                this.owlNav.children().css('top', '50%');
            }
        }        
    }
    
    context = this;
    this.init();
}

var slides = [];
$(window).load(function () {
    var slide_index = 0;
    $('.slideList').each(function () {
        slides[slide_index] = new TopSlideshow(this);
        slide_index++;
    });
});