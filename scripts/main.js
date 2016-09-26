$(document).ready(function () {
    var arraySaveString = [];

    $('.input-group').removeClass('hasError');
    $('.input-group + .alert').hide();
    $('input[name=getString]').focus(function () {
        $(this).keyup(function () {
            console.log('aa1');
            if ($('input[name=getString]').val().length < 1) {
                $('input[name=getString]').addClass('required');
                $('.input-group').addClass('hasError');
                $('.input-group + .alert').show();
                console.log('aa');
            }
            else {
                $('input[name=getString]').removeClass('required');
                $('.input-group').removeClass('hasError');
                $('.input-group + .alert').hide();
            }
        });
    });

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
            $('.listOfText').append('<div class="itemText itemText-'+ i +'">' + getString + '<a href="#" class="delete label label-danger">Delete</a></div>');
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
});

$('.itemText').on('load', function () {
    console.log('sdasdas');
    $('.delete').click(function () {
        $(this).parent().remove();
    });
});
