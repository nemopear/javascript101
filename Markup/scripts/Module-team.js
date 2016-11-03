$(function () {
    setTimeout(function () { truncateText('.staffNameHover'); }, 200);
});

$('.staffItem').on('click', function () {
    $(this).addClass('active');
    $(this).click(function () {
        $(this).removeClass('active');
    });
});


$('.staffItem').on('mouseover', function () {
    $(this).addClass('active');
}).on('mouseout', function () {
    $(this).removeClass('active');
});