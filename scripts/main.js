function InputSet(element) {
    var arraySaveString = [];
    var context;
    this.inputContainer = $(element).find('.input-group');
    this.input = $(element).find('.form-control');
    this.alert = $(element).find('.alert');
  
    this.init = function () {
        this.bindEvent();
    };

    this.bindEvent = function () {
        this.onFocus();
        this.onKeyUp();
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
                context.alert.show();
            }
            else {
                $(this).removeClass('required');
                context.inputContainer.removeClass('hasError');
                context.alert.hide();
            }
        });
    };

    

    var i = 0;
    $('#saveText').click(function () {
        $('.alert').hide();
        var getString = $('input[name=getString]').val();
        if (getString === '') {
            $('.input-group').toggleClass('hasError');
            $('input[name=getString]').addClass('required');
            $('.input-group + .alert').show();
        }
        else {
            $('.input-group').removeClass('hasError');
            $('input[name=getString]').val('');
            arraySaveString.push(getString);
            console.log(arraySaveString + '[' + i + ']');
            $('.listOfText').append('<div class="itemText itemText-' + i + '">' + getString + '<a href="#" class="delete label label-danger">Delete</a></div>');
            i++;
        }
    });

    $('#clearText').click(function () {
        $('.listOfText').empty();
    });

    $('#comeBack').click(function () {
        $('.listOfText').empty();
        for (var i = 0; i < arraySaveString.length; i++) {
            var inputTextVal = arraySaveString[i];

            $('.listOfText').append('<div class="itemText itemText-' + i + '">' + inputTextVal + '<a href="#" class="delete label label-danger">Delete</a></div>');

        }
    });

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
/*
$('.itemText').on('load', function () {
    console.log('sdasdas');
    $('.delete').click(function () {
        $(this).parent().remove();
    });
});
*/