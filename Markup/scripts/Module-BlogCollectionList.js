function tabsFunction(element) {
    var context;
    this.tabs = $(element);
    this.tabItem = this.tabs.find('.tabsItem');
    this.tabContent = $('.tabContent');

    this.init = function () {
        this.create();
    }

    this.create = function () {
        this.tabItem.click(function () {
            var dataID = $(this).attr('data-tabID');
            $(this).addClass('active').siblings().removeClass('active');
            context.tabContent.filter("[id='" + dataID + "']").addClass('active').siblings().removeClass('active');
        });
    }

    context = this;
    this.init();
}

var tapElements = [];
$(window).load(function () {
    var tapElements_index = 0;
    $('.tabsList').each(function () {
        tapElements[tapElements_index] = new tabsFunction(this);
        tapElements_index++;
    });
});

$(window).load(function () {
    childEqualHeight('.blogFilterTab', '.blogFilterTabLink');
});

$(window).resize(function () {
    childEqualHeight('.blogFilterTab', '.blogFilterTabLink');
});