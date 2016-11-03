function filterFunction(element) {
    var context;
    this.filterGrid = $(element);
    this.filterItemSelector = '.filterItem';
    this.filterSelector = '.filters';
    this.filterButtonSelector = '.button';
    this.filterButtonGroupSelector = '.button-group';
    this.filterSelectedDropdownSelector = '.dropdown-toggle';
    this.body = $('body');
    this.filterGroupElement = $('.filterGroup');//$('.filters')
    this.filterButtonGroupElement = $('.button-group');

    this.init = function () {
        this.create();
        this.filterGroupFunction();
        this.activeFilterButton();
    }

    this.create = function () {
        this.grid = this.filterGrid.isotope({
            itemSelector: this.filterItemSelector,
            transitionDuration: 700
        });
    }

    this.filterGroupFunction = function () {
        // store filter for each group
        var filters = {};

        this.filterGroupElement.on('click', this.filterButtonSelector, function () {
            // get group key
            var $buttonGroup = $(this).parents(context.filterButtonGroupSelector);
            var filterGroup = $buttonGroup.attr('data-filter-group');
            // set filter for group
            filters[filterGroup] = $(this).attr('data-filter');
            // combine filters
            var filterValue = context.concatValues(filters);
            // set filter for Isotope
            context.grid.isotope({ filter: filterValue });
        });
    };

    this.activeFilterButton = function () {
        // change is-checked class on buttons
        this.filterButtonGroupElement.each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');

                /* update filter button between mobile filter and desktop filter*/
                var buttonData = $(this).attr('data-filter');
                $(this).parents(context.filterSelector).siblings(context.filterSelector).find(context.filterButtonSelector).removeClass('is-checked');
                $(this).parents(context.filterSelector).siblings(context.filterSelector).find('.button[data-filter="' + buttonData + '"]').addClass('is-checked');
                
                /* update text in dropdown filter */
                var activeFilterText = $(this).text();
                $(this).parents(context.filterSelector).siblings(context.filterSelector).find(context.filterSelectedDropdownSelector).html(activeFilterText + '<b class=\"caret\"></b>');
                $(this).parents(context.filterButtonGroupSelector).siblings(context.filterSelectedDropdownSelector).html(activeFilterText + '<b class=\"caret\"></b>');
            });
        });
    };

    this.concatValues = function (obj) {
        // flatten object by concatting values
        var value = '';
        for (var prop in obj) {
            value += obj[prop];
        }
        return value;
    };

    context = this;
    this.init();
}

var filters = [];
$(window).load(function () {
    var filter_index = 0;
    $('.filterGrid').each(function () {
        filters[filter_index] = new filterFunction(this);
        filter_index++;
    });
});