$(function () {
    setTimeout(function () { truncateText('.bannerTitle,.bannerDescription, .redBarTitle'); }, 200);
});

$(window).load(function () {
    $('.imageDiv').imageDeviceResponsive();
});
