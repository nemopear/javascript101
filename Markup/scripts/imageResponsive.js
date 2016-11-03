(function ($, window, document) {

    var DeviceResonsive = {
        setImageResponsive: function (imageDiv, imageResponsive) {
            var divWidth = imageDiv.width();
            var divHeight = imageDiv.height();
            var divCenterX = divWidth / 2;
            var divCenterY = divHeight / 2;

            var imgHeight = imageResponsive.prop("naturalHeight");
            var imgWidth = imageResponsive.prop("naturalWidth");

            var newImageCenterX = imageResponsive.data("center-x");
            var newImagecenterY = imageResponsive.data("center-y");

            // Not define image center
            if (!newImageCenterX)
                newImageCenterX = imgWidth / 2;
            else
                newImageCenterX = newImageCenterX * imgWidth;

            if (!newImagecenterY)
                newImagecenterY = imgHeight / 2;
            else
                newImagecenterY = newImagecenterY * imgHeight;

            var newImageWidth = 0;
            var newImageHeight = 0;
            var marginLeft = 0;
            var marginTop = 0;

            var ratioHeight = divHeight / imgHeight;
            var ratioWidth = divWidth / imgWidth;
            var ratio = ratioHeight > ratioWidth ? ratioHeight : ratioWidth;


            newImageWidth = imgWidth * ratio;
            newImageHeight = imgHeight * ratio;

            newImageCenterX = newImageCenterX * ratio;
            newImagecenterY = newImagecenterY * ratio;

            marginLeft = divCenterX - newImageCenterX;
            if (marginLeft > 0 && -marginLeft + divWidth <= newImageWidth)
                marginLeft = 0;
            else if (-marginLeft + divWidth > newImageWidth)
                marginLeft = -(newImageWidth - divWidth);

            marginTop = divCenterY - newImagecenterY;
            if (marginTop > 0 && -marginTop + divHeight <= newImageHeight)
                marginTop = 0;
            else if (-marginTop + divHeight > newImageHeight)
                marginTop = -(newImageHeight - divHeight);


            imageResponsive.attr("style", "display: block; max-width: none !important;max-height: none !important;width:" + newImageWidth + "px;height:" + newImageHeight + "px;margin-left:" + marginLeft + "px;margin-top:" + marginTop + "px;");
        },
        setAllImageResponsive: function (base, el) {		
            $.each($(".imageDiv"), function () {
                base.setImageResponsive(el, $(this).children(".image-item"));
            });
        },
        init: function (el) { 
            var base = this;
            $.each(el.find(".image-item"), function (index, image) {
                base.setImageResponsive(el, $(this));
                $(image).load(function () { 
                    base.setImageResponsive(el, $(this));
                });
            });

            $(window).on("resize", function (event) {
                base.setAllImageResponsive(base, el);
			});
        }
    };

    $.fn.imageDeviceResponsive = function () {
        var imageResponsive = Object.create(DeviceResonsive);
        imageResponsive.init(this);
    }
}(jQuery, window, document))