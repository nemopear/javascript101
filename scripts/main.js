$(document).ready(function () {

    var arraySaveString = [];
    $('input[name=getString]').focus(function () {
        $('input[name=getString]').addClass('required');
        if ($('input[name=getString]').val().length < 1) {
            $('.input-group').addClass('hasError');
            $('.input-group + .alert').show();
        }
        else {
            $('.input-group').removeClass('hasError');
            $('.input-group + .alert').hide();
        }
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

    $('input[name=getString]').focusout(function (){
        $('input[name=getString]').removeClass('required');
        $('.input-group').removeClass('hasError');
        $('.input-group + .alert').hide();
    });



    $('#saveText').click(function () {
        $('.alert').hide();
        var getString = $('input[name=getString]').val();
        if (getString === '') {
            //$('.input-group + alert').hide();
            $('input[name=getString]').css('border', '2px solid red');
            $('.input-group').toggleClass('hasError');
            $('.input-group + .alert').show();
        }
        else {
            //$('input[name=getString]').css('border', '0');
            $('input[name=getString]').val('');
            arraySaveString.push(getString);
            console.log(arraySaveString);
            $('.listOfText').append(getString + '<br />');
        }
    });

    $('#clearText').click(function () {
        $('.listOfText').empty();
    });

    $('#comeBack').click(function () {
        $('.listOfText').empty();
        for (var i = 0; i < arraySaveString.length; i++) {
            var inputTextVal = arraySaveString[i];
            $('.listOfText').append(inputTextVal + '<br />');
        }        
    });


    //var $arraySaveString = $arraySaveString.push(getString);
    //console.log($arraySaveString);
});
