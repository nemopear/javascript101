function calRandom() {
    $('#playPause').click(function () {
        var bodyWidth = $('body').width();
        var bodyHeight = $('body').height();
        var randomX = Math.random() * bodyWidth;
        var randomY = Math.random() * bodyHeight;
        console.log(randomX);
        $('.ball').css('top', randomY);
        $('.ball').css('left', randomX);
    });
};


$(document).ready(function () {
    calRandom();
});