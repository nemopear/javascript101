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

    // Todo render HTML

    this.onClickSave = function () {
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
                context.onRenderList(context.arraySaveString.length, context.input.val());
                //context.list.find('.itemText').addClass('animated animatedFast fadeIn');
                context.input.val('');
                context.onDeleteEvent();
            }
        });
    };

    this.onRenderList = function (i, j) {
        console.log('Get i ' + i);
        console.log(j);
        context.list.append('<div class="ui-state-default itemText itemText-' + i + ' animated animatedFast fadeInUp" data-index="' + i + '"><span class="text">' + j + '</span><a href="#" class="delete label label-danger">Delete</a></div>');
        context.onDeleteEvent();
    }

    this.onDeleteEvent = function () {
        var deleteItem = [];
        $(element).find('.delete').unbind('click');
        $(element).find('.delete').bind('click', function (a) {
            a.preventDefault();
            var getTextDelete = $(this).siblings('.text').text();
            for (var i = 0; i < context.arraySaveString.length; i++) {
                if (getTextDelete === context.arraySaveString[i]) {
                    context.arraySaveString.splice(i,1);
                    //$(this).parents('.itemText').remove();
                    $(this).parents('.itemText').removeClass('fadeIn').addClass('fadeOutRight');
                    setTimeout(function () {
                        context.list.find('.fadeOutRight').remove();
                    }, 300);
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
                context.onRenderList(i, inputTextVal);
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
