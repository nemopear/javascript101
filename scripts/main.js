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
            //console.log('123');
            hasScrolled();
            didScroll = false;

        }
    }, 250);

    function hasScrolled() {
        var st = $(window).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('#mainMenu').removeClass('nav-down').addClass('nav-up');
            console.log('1453')
        } else {
            // Scroll Up
            $('#mainMenu').removeClass('nav-up').addClass('nav-down');
            if (st + $(window).height() < $(document).height()) {
                $('#mainMenu').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }
};






///////////////////////////// Input Function
function InputSet(element) {
    var context;
    this.inputContainer = $(element).find('.input-group');
    this.input = $(element).find('.form-control');
    this.alert = $(element).find('.alert');
    this.saveText = $(element).find('#saveText');
    this.arraySaveString = [];
    this.list = $(element).find('.listOfText');
    this.clearText = $(element).find('#clearText');
    this.comeBack = $(element).find('#comeBack');
    this.delBtn = $(element).find('.delete');
    this.sortList = $(element).find('#sortable');
  
    this.init = function () {
        this.bindEvent();
    };

    this.bindEvent = function () {
        this.onFocus();
        this.onKeyUp();
        this.onClickSave();
        this.onClickReset();
        this.onClickComeback();
        this.onSortList();
        //this.onRenderList();
    };

    this.onFocus = function () {
        this.input.focus(function () {    
        });
    };

    this.onKeyUp = function () {
        this.input.keyup(function () {
            if (!$(this).val()) {
                $(this).addClass('required');
                context.inputContainer.addClass('hasError');
                context.alert.show('fade', 100);
            }
            else {
                $(this).removeClass('required');
                context.inputContainer.removeClass('hasError');
                context.alert.hide('fade', 100);
            }
        });
    };


    this.onClickSave = function () {
        var i = 0;
        this.saveText.click(function () {
            if (!context.input.val()) {
                console.log('No content');
                context.inputContainer.addClass('hasError');
                context.alert.show();
            }
            else {
                context.inputContainer.removeClass('hasError');
                context.alert.hide();
                context.arraySaveString.push(context.input.val());
                console.log('Add content : ' + context.input.val() + ' Array [' + i + ']');
                context.list.append('<div class="ui-state-default itemText itemText-' + i + '" data-index="' + i + '"><span class="text">' + context.input.val() + '</span><a href="#" class="delete label label-danger">Delete</a></div>');
                context.input.val('');
                i++;
                context.onDeleteEvent();
            }
        });
    };

    // this.onRenderList = function() {
    //     context.list.append('<div class="itemText itemText-' + i + '"><span class="text">' + context.input.val() + '</span><a href="#" class="delete label label-danger">Delete</a></div>');
    //     context.onDeleteEvent();

    // }

    this.onDeleteEvent = function () {
        var deleteItem = [];
        $(element).find('.delete').unbind('click');
        $(element).find('.delete').bind('click', function () {
            var getTextDelete = $(this).siblings('.text').text();
            for (var i = 0; i < context.arraySaveString.length; i++) {
                if (getTextDelete === context.arraySaveString[i]) {
                    context.arraySaveString.splice(i,1);
                    $(this).parents('.itemText').remove()
                    ;
                }
                else {

                }
            }    
        });
    };

    this.onClickReset = function () {
        this.clearText.click(function () {
            context.list.empty();
        });
    };

    this.onClickComeback = function () {
        this.comeBack.click(function () {
            context.list.empty();
            console.log(context.arraySaveString.length + " hello");    
            for (var i = 0; i < context.arraySaveString.length; i++) {
                var inputTextVal = context.arraySaveString[i];
                context.list.append('<div class="ui-state-default itemText itemText-' + i + '" data-index="'+i+'"><span class="text">' + inputTextVal + '</span><a href="#" class="delete label label-danger">Delete</a></div>');
                context.onDeleteEvent();
            }
        });
    };

    this.onSortList = function () {
        this.sortList.click(function () {
            $(this).sortable({
                placeholder: "ui-sortable-placeholder",

                update: function (event, sender) {
                    context.updateOrder();

                }
            });
        });
    };

    this.updateOrder = function () {
        context.arraySaveString = [];
        var index = 0;
        $(element).find('.itemText').each(function () {
            $(this).attr('data-index', index);
            context.arraySaveString.push($(this).children('.text').text());
            index++;
        });
    };

    context = this;
    this.init();
}

var inputs = [];

$(document).ready(function () {
    $('.input-row').each(function () {
        var ip = new InputSet(this);
        inputs.push(ip);
    });
    console.log(inputs);
});
